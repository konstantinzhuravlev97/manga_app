import { createRoot } from "react-dom/client";
import App from "./components/app/App";

// import JikanService from "./services/JikanService";

import "./style/style.scss";

// const jikanService = new JikanService();

// jikanService.getAllCharacters().then(res => console.log(res));

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <App />
);
