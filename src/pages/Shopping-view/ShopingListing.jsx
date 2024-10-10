import ProductDetailsDialog from "@/components/Shopping-Vew/ProductDetailsDialog";
import ProductFilter from "@/components/Shopping-Vew/ProductFilter";
import ShopingProductTile from "@/components/Shopping-Vew/ShopingProductTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/Cart-Slice/ShopCartSlice";
import { fetchAllFilterdProducts, fetchProdcutDetails } from "@/store/shop/products-slice/ShoppingProductSlice";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams,sortParams){
  const queryParams = [];

  for(const [key,value] of Object.entries(filterParams)){
    if(Array.isArray(value) && value.length > 0){
      const paramValue = value.join(",")

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }
  if(sortParams){
    queryParams.push(`sortBy=${encodeURIComponent(sortParams)}`)
  }
  return queryParams.join('&')
}

const ShopingListing = () => {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const {user} = useSelector(state => state.auth)
  // console.log("userid is", user)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const {toast} = useToast()

  const categorySearchParam = searchParams.get('category')

  function handleSort(value){
    // console.log(value)
    setSort(value)
  }

  function handleFilter(getSectionId, getCurrentOption){
    console.log("getSectionId",getSectionId,"getCurrentOption",getCurrentOption)

    let copyFilters = {...filters};
    const indexOfCurrentSection = Object.keys(copyFilters).indexOf(getSectionId)
    // console.log(indexOfCurrentSection)
    
    if(indexOfCurrentSection === -1){
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption]
      } 
    } else {
      const indexOfCurrentOption = copyFilters[getSectionId].indexOf(getCurrentOption)
      if(indexOfCurrentOption === -1) 
        copyFilters[getSectionId].push(getCurrentOption);
      else copyFilters[getSectionId].splice(indexOfCurrentOption, 1)
    }
    setFilters(copyFilters)
    sessionStorage.setItem("filters", JSON.stringify(copyFilters))  
  }

  function handleGetProductDetails(getCurrentProductId){
    console.log("current product id is : ", getCurrentProductId)
    dispatch(fetchProdcutDetails(getCurrentProductId))
  }
  
  function handleAddToCart(getCurrentId) {
    console.log(getCurrentId)
    dispatch(addToCart({userId: user?.id, productId: getCurrentId, quantity: 1}))
    .then(data=> {
      console.log('data is: ', data)
      if(data?.payload?.success){
        dispatch(fetchCartItems(user?.id))
        toast({
          title: "Product is added to cart"
        })
      }
    })
  }

  useEffect(()=>{
    setSort("price-lowtohigh")
    setFilters(JSON.parse(sessionStorage.getItem('filters'))|| {})
  },[categorySearchParam])

  useEffect(()=>{
    if(filters && Object.keys(filters).length > 0){
      const createQuireyString = createSearchParamsHelper(filters,sort)
      console.log("update query string", createQuireyString)
      setSearchParams(new URLSearchParams(createQuireyString))
    }
  },[filters,sort])

  useEffect(() => {
    if(filters !== null && sort !== null)
    dispatch(fetchAllFilterdProducts({filterParams: filters, sortParams: sort}));
  }, [dispatch, sort, filters]);

  useEffect(()=>{
    if(productDetails !== null) setOpenDetailsDialog(true)
    
  },[productDetails])


  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter}/>
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{productList?.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id} 
                      >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShopingProductTile
                 handleGetProductDetails={handleGetProductDetails}
                 product={productItem} 
                 handleAddToCart={handleAddToCart}
                 />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog
       openDetailsDialog={openDetailsDialog} 
       setOpenDetailsDialog={setOpenDetailsDialog} 
       productDetails={productDetails}
       />
    </div>
  );
};

export default ShopingListing;
