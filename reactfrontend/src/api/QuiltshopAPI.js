// QuiltshopAPI
// Fetch calls to django
const BASE_URL = "http://localhost:8000/products";
const ADDRESS_URL = "http://localhost:8000/validate/";
const CUSTOMER_URL = "http://localhost:8000/customers";

const fetchProductByID = async (product_id) => {
  const product = await fetch(`${BASE_URL}/${product_id}`);
  const response = await product.json();
  return response;
};

const fetchProducts = async () => {
  const products = await fetch(`${BASE_URL}/`);
  const response = await products.json();
  return response;
}

const deleteProduct = async (product_id) => {
  const response = await fetch(`${BASE_URL}/${product_id}/delete`, {method:"POST"});
  return await response.json();
}

const editProduct = async (productObject) => {
  const options = {
    method: "POST",
    body: JSON.stringify(productObject)
  }
  const response = await fetch(`${BASE_URL}/${productObject.id}/edit`, options);
  return await response.json();
}

const newProduct = async (productObject) => {
  const options = {
    method: "POST",
    body: JSON.stringify(productObject)
  }
  const response = await fetch(`${BASE_URL}/new`, options);
  return await response.json();
}

/**
 * Searches for products by keywords
 * @param {array} keywordArray
 */
const fetchProductsByKeyword = async (keywordArray) => {
  // Construct keyword section of url
  const query = keywordArray.map(keyword=>`keyword=${keyword}`).join('&');
  const products = await fetch(`${BASE_URL}/search?${query}`);
  const response = await products.json();
  return response;
};

const setProductReserved = async (productObject, is_reserved) => {
  productObject.is_reserved = is_reserved;
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(productObject)
  };
  const response = await fetch(`${BASE_URL}/${productObject.id}/edit`, options);
  const jsonResponse = await response.json();
  return jsonResponse;
}

/**
 * addressObject must include:
 * street_address, state, city, zipcode
 * Returns the same structure object
 * Returns {'error': message} if an error occurs
 * @param {object} addressObject 
 */
const validateAddress = async (addressObject) => {
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(addressObject)
  }

  try {
    const response = await fetch(ADDRESS_URL, options);
    const jsonResponse = await response.json();
    const raw_address = await jsonResponse["XAVResponse"]["Candidate"]["AddressKeyFormat"];
    const formatted_address = await {
      'street_address': raw_address["AddressLine"],
      'city': raw_address["PoliticalDivision2"],
      'state': raw_address["PoliticalDivision1"],
      'zipcode': raw_address["PostcodePrimaryLow"],
      'zipcode_ext': raw_address["PostcodeExtendedLow"]
    };
    // console.log(formatted_address); // Working right
    return formatted_address;
  }
  catch (error) {
    console.error(error);
    return {"error": "Unable to validate address."}
  }
}

const fetchCustomers = async () => {
  const response = await fetch(CUSTOMER_URL);
  return await response.json();
}

const addCustomer = async (customerObject) => {
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(customerObject)
  }
  const response = await fetch(`${CUSTOMER_URL}/add/`, options);
  return await response.json();
}

export {
  fetchProductByID,
  fetchProducts,
  deleteProduct,
  editProduct,
  newProduct,
  fetchProductsByKeyword,
  setProductReserved,
  validateAddress,
  fetchCustomers,
  addCustomer
};
