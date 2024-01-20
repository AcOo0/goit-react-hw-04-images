import axios from "axios";

const instance = axios.create({
    baseURL: "https://pixabay.com/api",
})

// /?q=cat&page=1&key=40906088-25cb83659f245cce39ac642e2&image_type=photo&orientation=horizontal&per_page=12"

export const getAllImages = () => {
    return instance.get("/?q=");
}

export const searchImages = (q, page = 1) => {
    return instance.get("/", {
        params: {
        q,
        page,
        key: "40906088-25cb83659f245cce39ac642e2",
        image_type: "photo",
        orientation: "horizontal",
        per_page: 12,            
        }
    })
}