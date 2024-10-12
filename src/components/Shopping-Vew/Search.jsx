import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/Search-slice/searchSlice";
import ShopingProductTile from "./ShopingProductTile";

const SearchProducts = () => {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  let timeoutId = null;
  console.log(keyword);

  useEffect(() => {

    if (timeoutId) clearTimeout(timeoutId); // clear any previously set timeout

    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      timeoutId = setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      dispatch(resetSearchResults());
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
    }

    return () => {
      if(timeoutId) clearTimeout(timeoutId)
    }
  
  }, [keyword]);

  console.log("search reasult", searchResults);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No Result Found!!!</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShopingProductTile product={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchProducts;
