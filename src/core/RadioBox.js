import React , {useState, useEffect, Fragment} from 'react';

const RadioBox = ({prices, handleFilters}) => {
    const [value, setValue] = useState(0);

    const handelChange = (event) => {
        handleFilters(event.target.value)
        setValue(event.target.value)
    }

    return prices.map ( (p,i) => (
        <div  key={i}>
            <input 
            onChange={handelChange} 
            name={p} // when we add this we can choose only one in the same time
            value={`${p._id}`} 
            type="radio" 
            className="mr-2 ml-4"></input>
    <label className="form-check-label">{p.name}</label>
        </div>
    ))
}

export default RadioBox;
