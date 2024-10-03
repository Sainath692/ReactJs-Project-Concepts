import "./App.css";
import FormWithYup from "./component/form_with_yup";
import FormWithoutYup from "./component/form_without_yup";

function App() {
  return (
    <div>
      <FormWithoutYup />
      <FormWithYup />
    </div>
  );
}

export default App;
