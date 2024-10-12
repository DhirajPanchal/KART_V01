import axios from "axios";

const GATEWAY = "http://localhost:8010";
const INVENTORY_SERVICE_ROUTE = "active-kart/inventory";

axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("TOKEN");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    console.log("__API " + config.method + " : " + config.url);

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const loadCategoryList = async (payload: any = {}): Promise<any> => {
  console.log("__ loadCategoryList ");

  const response = await axios.post(
    `${GATEWAY}/${INVENTORY_SERVICE_ROUTE}/api/inventory/category/list`,
    JSON.stringify(payload),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  return response.data;
};

export const loadSubCategoryList = async (payload: any = {}): Promise<any> => {
  console.log("__ loadSubCategoryList ");

  const response = await axios.post(
    `${GATEWAY}/${INVENTORY_SERVICE_ROUTE}/api/inventory/category/0/subcategory/list`,
    JSON.stringify(payload),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  return response.data;
};

//
export const loadProductList = async (payload: any = {}): Promise<any> => {
  console.log("__ loadProductList ");

  const response = await axios.post(
    `${GATEWAY}/${INVENTORY_SERVICE_ROUTE}/api/inventory/category/0/subcategory/8/product/list`,
    JSON.stringify(payload),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  return response.data;
};
