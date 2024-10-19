import axios, { AxiosError, AxiosResponse } from "axios";
import { ListResponse } from "../model/ListResponse";
import { Category } from "../model/Category";
import { DEFAULT_LIST_PAYLOAD } from "../component/DataGridHelper";
import { toast } from "react-toastify";
import { SubCategory } from "../model/SubCategory";
import { Product } from "../model/Product";

const GATEWAY = "http://localhost:8010";

const INVENTORY_SERVICE_ROUTE = "active-kart/inventory";

axios.defaults.baseURL = `${GATEWAY}/${INVENTORY_SERVICE_ROUTE}/api/`;

axios.interceptors.request.use(
  (config) => {
    //console.log("[OUTBOUND] __API (INV) " + config.method + " : " + config.url);

    config.headers["Content-Type"] = "application/json";

    const token = sessionStorage.getItem("TOKEN");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async (response) => {
    //console.log("[INBOUND] __API (INV) RESPONSE");
    //console.log(response);
    toast("Success");
    return response;
  },
  (error: AxiosError) => {
    const { status, statusText } = error.response!;
    console.error(
      "[INBOUND] __API (INV) ERROR :: " + status + " :: " + statusText
    );
    console.error(error.response);
    toast.error(`ERROR ${status} : ${statusText}`);
    // switch (status) {
    //   case 400:
    //     console.warn("__API (INV) ERROR - 400 ");
    //     break;
    //   case 401:
    //     console.warn("__API (INV) ERROR - 401 Unauthorized ");
    //     break;
    //   case 404:
    //     console.warn("__API (INV) ERROR - 404");
    //     break;
    //   case 500:
    //     console.warn("__API (INV) ERROR - 500 Server Error");
    //     break;
    //   default:
    //     console.warn("__API (INV) ERROR - Unknown");
    //     break;
    // }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
  post: <T>(url: string, body: any) =>
    axios.post<T>(url, body).then(responseBody),
};

const loadCategoryList = (payload: any = DEFAULT_LIST_PAYLOAD) =>
  request.post<ListResponse<Category>>("inventory/category/list", payload);

const loadSubCategoryList = (payload: any = DEFAULT_LIST_PAYLOAD) =>
  request.post<ListResponse<SubCategory>>(
    "inventory/category/0/subcategory/list",
    payload
  );

const loadProductList = (payload: any = DEFAULT_LIST_PAYLOAD) =>
  request.post<ListResponse<Product>>(
    "inventory/category/0/subcategory/8/product/list",
    payload
  );

const loadCategoryById = (id: number) => {
  return request.get<Category>(`inventory/category/${id}`);
};

const ApiHub = {
  loadCategoryList,
  loadCategoryById,

  loadSubCategoryList,
  loadProductList,
};

export default ApiHub;
