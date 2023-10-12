import "./index.css";
//https://new-99.myshopify.com/collections/all
import { useEffect, useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Checkbox from "@mui/material/Checkbox";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FlexBetween from "components/FlexBetween";

import StockCard from "components/StockCard";
import { stockItems } from "./stock";

const StockPage = () => {
  const [test, setTest] = useState(stockItems);
  const [filteredStock, setFilteredStock] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [colorFilter, setColorFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const [expanded, setExpanded] = useState(true);
  const [alignment, setAlignment] = useState("grid");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [colors, setColors] = useState([
    { _id: 1, type: "Red", active: false },
    { _id: 2, type: "Orange", active: false },
    { _id: 3, type: "Yellow", active: false },
    { _id: 4, type: "Green", active: false },
    { _id: 5, type: "Blue", active: false },
    { _id: 6, type: "Indigo", active: false },
    { _id: 7, type: "Purple", active: false },
  ]);
  const [sizes, setSizes] = useState([
    { _id: 1, type: "xs", active: false },
    { _id: 2, type: "s", active: false },
    { _id: 3, type: "m", active: false },
    { _id: 4, type: "l", active: false },
    { _id: 5, type: "xl", active: false },
  ]);

  useEffect(() => {
    let tempColor = [];
    test.map((stock) => {
      for (var i = 0; i < colorFilter.length; i++) {
        for (var j = 0; j < stock.color.length; j++) {
          if (stock.color[j] == colorFilter[i]) {
            tempColor.push(stock);
          }
        }
      }
    });

    let tempSize = [];
    test.map((stock) => {
      for (var j = 0; j < sizeFilter.length; j++) {
        if (stock.size == sizeFilter[j]) {
          tempSize.push(stock);
        }
      }
    });

    //let tempStock = tempColor.concat(tempSize);

    let tempStock = [];

    test.map((stock) => {
      for (var j = 0; j < sizeFilter.length; j++) {
        if (stock.size == sizeFilter[j]) {
          for (var i = 0; i < colorFilter.length; i++) {
            for (var k = 0; k < stock.color.length; k++) {
              if (stock.color[k] == colorFilter[i]) {
                tempStock.push(stock);
              }
            }
          }
        }
      }
    });

    let tempDefault = test;

    if (priceFilter.minPrice !== "" && priceFilter.maxPrice !== "") {
      tempColor = tempColor.filter(
        (stock) =>
          stock.cost > priceFilter.minPrice &&
          stock.cost < priceFilter.maxPrice,
      );

      tempSize = tempSize.filter(
        (stock) =>
          stock.cost > priceFilter.minPrice &&
          stock.cost < priceFilter.maxPrice,
      );
      tempStock = tempStock.filter(
        (stock) =>
          stock.cost > priceFilter.minPrice &&
          stock.cost < priceFilter.maxPrice,
      );
      console.log(tempDefault);
      tempDefault = tempDefault.filter(
        (stock) =>
          stock.cost > priceFilter.minPrice &&
          stock.cost < priceFilter.maxPrice,
      );
      console.log(tempDefault);
    }

    // const jsonObject = tempStock.map(JSON.stringify);
    // const uniqueSet = new Set(jsonObject);
    // const uniqueArray = Array.from(uniqueSet).map(JSON.parse);

    if (colorFilter.length === 0 && sizeFilter.length === 0) {
      setFilteredStock(tempDefault);
    } else if (colorFilter.length === 0 && sizeFilter.length > 0) {
      setFilteredStock(tempSize);
    } else if (sizeFilter.length === 0 && colorFilter.length > 0) {
      setFilteredStock(tempColor);
    } else {
      setFilteredStock(tempStock);
    }
  }, [colorFilter, sizeFilter, priceFilter]);

  const perPage = 6;
  const pages = Math.ceil(filteredStock.length / perPage);

  filteredStock.sort((p1, p2) => {
    switch (sort) {
      case "featured":
          return p1._id > p2._id ? 1 : p1._id < p2._id ? -1 : 0
      case "price-ascend":
          return p1.cost > p2.cost ? 1 : p1.cost < p2.cost ? -1 : 0
      case "price-decend":
          return p1.cost < p2.cost ? 1 : p1.cost > p2.cost ? -1 : 0
      case "date-ascend":
        break;
      case "date-decend":
        break;
      default:
        break;
    }
  })

  // switch (sort) {
  //   case "featured":
  //     filteredStock.sort((p1, p2) =>
  //       p1._id > p2._id ? 1 : p1._id < p2._id ? -1 : 0,
  //     );
  //     break;
  //   case "price-ascend":
  //     filteredStock.sort((p1, p2) =>
  //       p1.cost > p2.cost ? 1 : p1.cost < p2.cost ? -1 : 0,
  //     );
  //     break;

  //   case "price-decend":
  //     filteredStock.sort((p1, p2) =>
  //       p1.cost < p2.cost ? 1 : p1.cost > p2.cost ? -1 : 0,
  //     );
  //     break;

  //   case "date-ascend":
  //     break;

  //   case "date-decend":
  //     break;

  //   default:
  //     break;
  // }

  // if (sort === "featured") {
  //   filteredStock.sort((p1, p2) =>
  //     p1._id > p2._id ? 1 : p1._id < p2._id ? -1 : 0,
  //   );
  // } else if (sort === "price-ascend") {
  //   filteredStock.sort((p1, p2) =>
  //     p1.cost > p2.cost ? 1 : p1.cost < p2.cost ? -1 : 0,
  //   );
  // } else if (sort === "price-decend") {
  //   filteredStock.sort((p1, p2) =>
  //     p1.cost < p2.cost ? 1 : p1.cost > p2.cost ? -1 : 0,
  //   );
  // } else if (sort === "date-ascend") {
  // } else if (sort === "date-decend") {
  // }

  let stockSlice = filteredStock.slice((page - 1) * perPage, page * perPage);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handlePriceRange = (min, max) => {
    setPriceFilter({ minPrice: min, maxPrice: max });
  };

  const handleActiveColor = (id) => {
    const newColors = colors.map((color) => {
      if (color._id === id) {
        return { ...color, active: !color.active };
      }
      return color;
    });

    setColors(newColors);

    if (!colors[id - 1].active === true) {
      setColorFilter([...colorFilter, colors[id - 1].type]);
    } else {
      setColorFilter((current) =>
        current.filter((color) => color !== colors[id - 1].type),
      );
    }
  };

  const handleActiveSize = (id) => {
    const newSizes = sizes.map((size) => {
      if (size._id === id) {
        return { ...size, active: !size.active };
      }
      return size;
    });

    setSizes(newSizes);

    if (!sizes[id - 1].active === true) {
      setSizeFilter([...sizeFilter, sizes[id - 1].type]);
    } else {
      setSizeFilter((current) =>
        current.filter((size) => size !== sizes[id - 1].type),
      );
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <div className="store-stock">
        <div className="store-sidebar">
          <div className="sb-item">
            <Accordion
              expanded={expanded}
              onChange={() => setExpanded(!expanded)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h3>Price</h3>
              </AccordionSummary>
              <AccordionDetails>
                <div className="sb-price-grid">
                  <div style={{ gridArea: "1 / 2 / 2 / 3" }}>
                    <div>To: </div>
                    <div className="price-input">
                      <input
                        value={maxPrice}
                        type="number"
                        placeholder="400"
                        style={{ width: "100%" }}
                        onChange={(e) => {
                          setMaxPrice(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ gridArea: "1 / 1 / 2 / 2" }}>
                    <div>From: </div>
                    <div className="price-input">
                      <input
                        value={minPrice}
                        type="number"
                        placeholder="0"
                        style={{ width: "100%" }}
                        onChange={(e) => {
                          setMinPrice(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ gridArea: "2 / 1 / 3 / 3" }}>
                    <div
                      className="price-filter"
                      onClick={() => {
                        handlePriceRange(minPrice, maxPrice);
                      }}
                    >
                      Filter
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>

          <div className="sb-item">
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h3>Colour</h3>
              </AccordionSummary>
              <AccordionDetails>
                {colors.map((color) => {
                  return (
                    <FlexBetween key={color._id}>
                      <div>{color.type}</div>
                      <Checkbox
                        color="default"
                        checked={color.active}
                        onClick={() => {
                          handleActiveColor(color._id);
                        }}
                      />
                    </FlexBetween>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="sb-item">
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h3>Size</h3>
              </AccordionSummary>
              <AccordionDetails>
                {sizes.map((size) => {
                  return (
                    <FlexBetween key={size._id}>
                      <div>{size.type}</div>
                      <Checkbox
                        color="default"
                        checked={size.active}
                        onClick={() => {
                          handleActiveSize(size._id);
                        }}
                      />
                    </FlexBetween>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="store-mainsection">
          <div className="store-nav">
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
            >
              <ToggleButton value="grid" className="store-view-icon">
                <GridViewRoundedIcon fontSize="large" />
              </ToggleButton>
              <ToggleButton value="list" className="store-view-icon">
                <ListRoundedIcon fontSize="large" />
              </ToggleButton>
            </ToggleButtonGroup>
            <FormControl sx={{ minWidth: "200px" }}>
              <Select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                }}
                displayEmpty
              >
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="price-ascend">Price, low to high</MenuItem>
                <MenuItem value="price-decend">Price, high to low</MenuItem>
                <MenuItem value="date-ascend">Date, new to old</MenuItem>
                <MenuItem value="date-decend">Date, old to new</MenuItem>
              </Select>
            </FormControl>
            <div>
              Showing{" "}
              {`${(page - 1) * perPage + 1} - ${
                page === pages ? filteredStock.length : page * perPage
              }`}{" "}
              of {`${filteredStock.length}`}
            </div>
          </div>
          <div className="store-body">
            <div className="store-grid">
              {stockSlice.map((stock, index) => {
                return (
                  <StockCard
                    key={index}
                    title={stock.title}
                    cost={stock.cost}
                    imgSrc={stock.imageSrc}
                  />
                );
              })}
            </div>
            <Pagination
              className="page-nav"
              count={pages}
              page={page}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockPage;
