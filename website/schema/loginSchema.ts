import * as yup from "yup";

const loginSchema = yup
    .object({
        email: yup.string().required("Trường này là bắt buộc"),
        password: yup.string().required("Trường này là bắt buộc"),
    })
    .required();

export default loginSchema;