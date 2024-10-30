import axios, { AxiosError, AxiosResponse } from "axios";
import { ListResponse } from "../model/ListResponse";
import { Category, CategoryLabel } from "../model/Category";
import {
  DEFAULT_LABEL_LIST_PAYLOAD,
  DEFAULT_LIST_PAYLOAD,
  ListPayload,
} from "../component/DataGridHelper";
import { toast } from "react-toastify";
import { SubCategory, SubCategoryLabel } from "../model/SubCategory";
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
    responseAnalysis(response);

    console.log("[INBOUND] __API (INV) RESPONSE", response.data);
    // console.log(response);
    //toast.success("Success");
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

function responseAnalysis(response: AxiosResponse<any, any>) {
  // console.log("**************************************************** START");
  // console.log(response);
  // console.log("METHOD : ", response?.config?.method);
  // console.log("URL   : ", response?.config?.url);
  const objective: string = response?.config?.headers["OBJECTIVE_TAG"];
  // console.log("objective   : ", objective);
  if (objective !== undefined && objective.trim().length > 0) {
    if (objective !== "X") {
      toast.success(objective);
    }

    return;
  }

  if (response?.config?.method === "put") {
    toast.success("Updated successful");
  } else if (response?.config?.method === "post") {
    if (response?.config?.url?.includes("/list")) {
      toast("Data grid refreshed");
    } else {
      toast.success("Created successful");
    }
  }

  // console.log("****************************************************");
}

const request = {
  get: <T>(url: string, objective?: string) =>
    axios.get<T>(url).then(responseBody),
  put: <T>(url: string, body: any, objective?: string) =>
    axios
      .put<T>(url, body, {
        headers: {
          OBJECTIVE_TAG: objective,
        },
      })
      .then(responseBody),
  delete: <T>(url: string, objective?: string) =>
    axios
      .delete<T>(url, {
        headers: {
          OBJECTIVE_TAG: objective,
        },
      })
      .then(responseBody),
  post: <T>(url: string, body: any, objective?: string) =>
    axios
      .post<T>(url, body, {
        headers: {
          OBJECTIVE_TAG: objective,
        },
      })
      .then(responseBody),
};

//  * * *  C A T E G O R Y  * * *

const loadCategoryList = (payload: ListPayload = DEFAULT_LIST_PAYLOAD) =>
  request.post<ListResponse<Category>>(
    `inventory/category/list?index=${payload.ui_only.index}&size=${payload.ui_only.size}`,
    payload
  );

const loadCategoryLabelList = (
  payload: ListPayload = DEFAULT_LABEL_LIST_PAYLOAD
) =>
  request.post<ListResponse<CategoryLabel>>(
    `inventory/category/list?index=${payload.ui_only.index}&size=${payload.ui_only.size}`,
    payload,
    "X"
  );

const loadCategoryById = (id: number) => {
  return request.get<any>(
    `inventory/category/${id}`,
    "Category retrieved successfully"
  );
};

const addCategory = (payload: any) => {
  return request.post<Category>(
    `inventory/category`,
    payload,
    "Category created successfully"
  );
};

const updateCategory = (id: number, payload: any) => {
  return request.put<Category>(
    `inventory/category/${id}`,
    payload,
    "Category updated"
  );
};

//  * * *  S U B - C A T E G O R Y  * * *

const loadSubCategoryList = (payload: ListPayload = DEFAULT_LIST_PAYLOAD) =>
  request.post<ListResponse<SubCategory>>(
    `inventory/category/${payload.ui_only.categoryId}/subcategory/list?index=${payload.ui_only.index}&size=${payload.ui_only.size}`,
    payload
  );

const loadSubCategoryLabelList = (
  payload: ListPayload = DEFAULT_LABEL_LIST_PAYLOAD
) =>
  request.post<ListResponse<SubCategoryLabel>>(
    `inventory/category/${payload.ui_only.categoryId}/subcategory/list?index=${payload.ui_only.index}&size=${payload.ui_only.size}`,
    payload
  );

const loadSubCategoryById = (id: number) => {
  return request.get<SubCategory>(
    `inventory/category/0/subcategory/${id}`,
    "Sub-Category retrieved successfully"
  );
};

const addSubCategory = (payload: any) => {
  return request.post<Category>(
    `inventory/category/${payload.ADD_KEY}/subcategory`,
    payload,
    "Sub-Category created successfully"
  );
};

const updateSubCategory = (id: number, payload: any) => {
  return request.put<Category>(
    `inventory/category/${payload.ADD_KEY}/subcategory/${id}`,
    payload,
    "Sub-Category Updated"
  );
};

//  * * *  P R O D U C T  * * *

const loadProductList = (payload: any = DEFAULT_LIST_PAYLOAD) =>
  request.post<ListResponse<Product>>(
    `inventory/category/${payload.ui_only.categoryId}/subcategory/${payload.ui_only.subCategoryId}/product/list?index=${payload.ui_only.index}&size=${payload.ui_only.size}`,
    payload
  );

const loadProductById = (id: number) => {
  return request.get<Product>(
    `inventory/category/0/subcategory/0/product/${id}`,
    "Product retrieved successfully"
  );
};

const addProduct = (payload: any) => {
  return request.post<Product>(
    `inventory/category/0/subcategory/${payload.ADD_KEY}/product`,
    payload,
    "Product created successfully"
  );
};

const updateProduct = (id: number, payload: any) => {
  return request.put<Product>(
    `inventory/category/0/subcategory/${payload.ADD_KEY}/product/${id}`,
    payload,
    "Product Updated"
  );
};

const ApiHub = {
  loadCategoryList,
  loadCategoryLabelList,
  loadCategoryById,
  addCategory,
  updateCategory,

  loadSubCategoryList,
  loadSubCategoryLabelList,
  loadSubCategoryById,
  addSubCategory,
  updateSubCategory,

  loadProductList,
  loadProductById,
  addProduct,
  updateProduct,
};

export default ApiHub;
