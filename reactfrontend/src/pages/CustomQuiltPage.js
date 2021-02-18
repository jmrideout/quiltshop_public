import { Button, MenuItem, TextField } from '@material-ui/core';
import React from 'react';


// Used to map array into selection options in form
const createOption = (option) => {
  return (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  );
}

// Size options and data
const sizeOptions = [
  {
    value: 'King',
    label: 'King (108 x 95)',
  },
  {
    value: 'Queen',
    label: 'Queen (90 x 96)',
  },
  {
    value: 'Full',
    label: 'Full (84 x 90)',
  },
  {
    value: 'Twin',
    label: 'Twin (70 x 90)',
  },
  {
    value: 'Baby',
    label: 'Baby (36 x 60)',
  },
  {
    value: "Custom",
    label: "Custom"
  }
];
const sizeData = {
  "King": {
    length: 95,
    width:  108,
    threadCost: 10.00,
    battingLength: (108+5)/36
  },
  "Queen": {
    length: 96,
    width:  90,
    threadCost: 8.00,
    battingLength: (90+5)/36
  },
  "Full": {
    length: 90,
    width:  84,
    threadCost: 7.00,
    battingLength: (85+5)/36
  },
  "Twin": {
    length: 90,
    width:  70,
    threadCost: 6.00,
    battingLength: (70+5)/36
  },
  "Baby": {
    length: 60,
    width: 36,
    threadCost: 4.00,
    battingLength: (36+5)/36
  }
};

// Stitching options and data
const stitchingOptions = [
  {
    value: "Simple",
    label: "Simple"
  },
  {
    value: "Intermediate",
    label: "Intermediate"
  },
  {
    value: "Complex",
    label: "Complex"
  }
];
const stitchingData = {
  "Simple": 0.02,
  "Intermediate": 0.035,
  "Complex": 0.05
}

const bindingOptions = [
  {
    value: "machine",
    label: "Machine Stitched"
  },
  {
    value: "hand",
    label: "Hand Stitched"
  }
];
const bindingData = {
  "machine": 0.25,
  "hand": 0.35
};

// Custom Quilt Page React Component
const CustomQuiltPage = (props) => {
  // Calculates total cost of quilt based on size and intricacy
  const calculateTotal = (data) => {
    // Base cost = 45.00
    // square_inches * Price per sqinch
    // Cost of thread
    // Cost of batting $10 per yard
    // Binding charges
    if (!bindingData || !stitchingData) return 0;
    if (!data && size!=="Custom") return 0;
    let base = 45.0;
    let length = 0;
    let width = 0;
    let battingLength = 0;
    let threadCost    = 10;
    if (size==="Custom") {
      width = customWidth;
      length = customLength;
      battingLength = width/36;
    }
    else {
      length = data["length"];
      width = data["width"];
      battingLength = data["battingLength"]
      threadCost    = data["threadCost"];
    }
    const squareInches  = length * width;
    const intricacyCost = stitchingData[intricacy];
    const bindingCost   = bindingData[binding];
    return base +
      (squareInches * intricacyCost) +
      threadCost +
      (bindingCost * (2 * length + 2 * width)) +
      (10 * battingLength);
  }
  
  // Event handlers
  const handleSizeChange = (event) => setSize(event.target.value);
  const handleIntricacyChange = (event) => setIntricacy(event.target.value);
  
  // React state variables
  const [size, setSize]             = React.useState("");
  const [intricacy, setIntricacy]   = React.useState("");
  const [binding, setBinding]       = React.useState("");
  const [quiltTotal, setQuiltTotal] = React.useState(0);
  const [customWidth, setCustomWidth]        = React.useState(0);
  const [customLength, setCustomHeight]      = React.useState(0);
  const [snackbarIsOpen, setSnackbarIsOpen]  = React.useState(false);
  // Custom dimensions input checking state variables
  const [heightErrorFlag, setHeightErrorFlag] = React.useState({});
  const [widthErrorFlag, setWidthErrorFlag]   = React.useState({});
  
  // React state functions
  React.useEffect(()=>{
    setQuiltTotal(calculateTotal(sizeData[size]))
  }, [size, intricacy, binding, customWidth, customLength]);

  // Add custom quilt to cart
  const addToCart = () => {
    const productObject = {
      image_url: "http://irepo.primecp.com/2016/12/309828/Charming-Liberty-Quilt-Tutorial_ExtraLarge1000_ID-1992025.jpg?v=1992025",
      name: "Custom Quilt",
      price_in_cents: Math.ceil(quiltTotal*100),
      details: {
        size: size,
        intricacy: intricacy,
        binding: binding,
      }
    };
    if (productObject["details"]["size"] === "Custom") {
      productObject["details"]["size"] += `: ${customWidth} x ${customLength}`
    }
    let cart = localStorage.getItem("QuiltCart");
    if (cart === null)
      cart = JSON.stringify([productObject]);
    else {
      // Read cart, append item
      cart = JSON.parse(cart);
      cart.push(productObject);
      cart = JSON.stringify(cart);
    }
    localStorage.setItem("QuiltCart", cart);
    // Alert
    setSnackbarIsOpen(true);
  };

  const handleWidthOnChange = (event) => {
    // Check input
    setCustomWidth(event.target.value)
    if (isNaN(Number(customWidth))) {
      setWidthErrorFlag({error: true});
      return;
    }
  }
  const handleHeightOnChange = (event) => {
    // Check input
    setCustomHeight(event.target.value)
    if (isNaN(Number(customWidth))) {
      setHeightErrorFlag({error: true});
      return;
    }
  }

  return (
    <div>
      CustomQuiltPage
      <form>
        <div>
          <TextField
            id="quilt-size"
            select
            label="Quilt Size"
            value={size}
            onChange={handleSizeChange}
            helperText="Please select quilt size"
            style={{margin:20}}
          >
            {sizeOptions.map(createOption)}
          </TextField>

          <TextField
            id="stitching-intricacy"
            select
            label="Stitching Complexity"
            value={intricacy}
            onChange={handleIntricacyChange}
            helperText="Please select stitching intricacy"
            style={{margin:20}}
          >
            {stitchingOptions.map(createOption)}
          </TextField>

          <TextField
            id="binding"
            select
            label="Binding"
            value={binding}
            onChange={(e)=>setBinding(e.target.value)}
            helperText="Please select binding"
            style={{margin:20}}
          >
            {bindingOptions.map(createOption)}
          </TextField>
        </div>
        {size === "Custom" ? <div>
          <TextField
            {...widthErrorFlag}
            id="customWidth"
            type="number"
            label="Width"
            value={customWidth}
            onChange={handleWidthOnChange}
            helperText="Please select custom width"
            style={{margin:20}}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {bindingOptions.map(createOption)}
          </TextField>
          <TextField
            {...heightErrorFlag}
            id="customLength"
            type="number"
            label="Length"
            value={customLength}
            onChange={handleHeightOnChange}
            helperText="Please select custom length"
            style={{margin:20}}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {bindingOptions.map(createOption)}
          </TextField>
        </div> : null}
      </form>
      <hr style={{margin: 20}} />
      <p>Estimated Total: ${quiltTotal ? quiltTotal.toFixed(2) : 0}</p>
      <Button color="primary" variant="contained" onClick={addToCart}>Add to Cart</Button>
      <p>Note: This cost does not include fabric cost. Factor in the price of fabric for the backing and top.</p>
    </div>
  );
};


export default CustomQuiltPage;
