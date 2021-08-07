// import { useState } from 'react';
import useForm from '../lib/useForm';

export default function CreateProduct() {
  // const [name, setName] = useState('Wes');
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Nice Shoes',
    price: 4315315,
    description: 'some expensive shoes',
  });
  return (
    <form>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="name"
          value={inputs.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="price">
        Price
        <input
          type="number"
          id="price"
          name="price"
          placeholder="price"
          value={inputs.price}
          onChange={handleChange}
        />
      </label>
      {/* <label htmlFor="description">
        Description
        <input
          type="text"
          id="description"
          name="description"
          placeholder="description"
          value={inputs.description}
          onChange={handleChange}
        />
      </label> */}

      <button type="button" onClick={clearForm}>
        Clear Form
      </button>
      <button type="button" onClick={resetForm}>
        Reset Form
      </button>
    </form>
  );
}
