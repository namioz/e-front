import React , {useState, useEffect} from 'react';

const Checkbox = ({categories, handleFilters}) => {
    const [checked, setCheked] = useState([])

    const handleToggel = c => () => {
        // return the first index or -1
        const currentCategoryId = checked.indexOf(c) 
        //exmapale to indexOf  var str = "Hello world, welcome to the universe.";
        //                     var n = str.indexOf("welcome"); => 13

        const newCheckedCategoryId = [...checked] // all the state
        // if currently checked was not already in checked state => push
        // else pull/take off

        if(currentCategoryId === -1){
            newCheckedCategoryId.push(c)
        }else{
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        // console.log(newCheckedCategoryId);
        setCheked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    }

    return categories.map ( (c,i) => (
        <li  key={i} className="list-unstyled">
            <input onChange={handleToggel(c._id)} value={checked.indexOf(c._id === -1)} type="checkbox" className="form-check-input"></input>
    <label className="form-check-label">{c.name}</label>
        </li>
    ))
    }

export default Checkbox;
