import React, { useState, useEffect } from 'react';
import { getCategories, list} from './apiCore';
import Card from './Card';

const Search = () => {

    const [data, setData] = useState({
        categories: [], 
        category: '', 
        search: '',
        results: [],
        searched: false
    });

    const {categories, category, search, results, searched} = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                setData({...data, categories: data})
            }
        })
    }

    useEffect( () => {
        loadCategories()
    }, [])

    const searchData = () => {
        // console.log(search, category)
        if(search){
            list({search: search || undefined, category: category})
            .then(response => {
                if(response.error){
                    console.log(response.error)
                }else{
                    setData({...data, results: response, search: true})
                }
            })
        }
    }

    const searchSubmit = (e) => {
        e.preventDefault()
        searchData()
    }

    const handelChange = name => event => {
        // debugger;
        setData({...data, [name]: event.target.value, searched: true});
    }

    const searchMessage = (searched, results) => {
        // console.log(searched)
        // console.log(results)
        if(searched && results.length > 0){
           return `Found  ${results.length} products`
        }
        if(searched && results.length < 1){
            return `No products found `
         }
    }

    const searchedProducts = (results = []) => {
        // debugger;
        return(
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h2>
                <div className="row">
                      {results.map( (product, i) => (
                      <Card key={i} product={product}></Card>
                      ) )}
                </div>
            </div>

        )
    }

    const searchFrom = () => (
        <form onSubmit={searchSubmit}>
        <span className="input-group-text">
            <div className="input-group input-group-lg" >
                <div className="input-group-prepend">
                    <select className="btn mr-2" onChange={handelChange('category')}>
                        <option value="All">All Category</option>
                         {categories.map( (c,i) => (
                         <option key={i}value={c._id}>
                         {c.name}
                         </option>
                         ))}
                    </select>
                </div>
            <input 
                type="search"
                className="form-control"
                onChange={handelChange("search")}
                placeholder="Search by name"
            ></input>
            </div>
            <div className="btn input-group-append" style={{border: 'none'}}>
                <button className="input-group-text">Search</button>
            </div>
        </span>
    </form>
    )


    return(
        <div className="row">
            <div className="container mb-3">
                {searchFrom()}
                {/* {JSON.stringify(results)} */}
            </div>
            <div className="container-fluid mb-3">
                {searchedProducts(results)}
            </div>
        </div>
    )
}

export default Search;