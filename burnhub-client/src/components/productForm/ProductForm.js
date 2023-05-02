import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProductForm = () => {
    const [product, setProduct] = useState({
        userId: "",
        name: "",
        category: "",
        description: "",
        price: "",
        image: "",
    });
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const localProjectUser = localStorage.getItem("project_user");
    const projectUserObject = JSON.parse(localProjectUser);

    const handleSaveButtonClick = (e) => {
        e.preventDefault();

        const productToSentToAPI = {
            userId: projectUserObject.id,
            name: product.name,
            category: product.category,
            description: product.description,
            price: product.price,
            image: product.image
        }
    

    const productData = fetch(`http://localhost:7069/Items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productToSentToAPI),
    })
        .then((response) => response.json())
        .then(() => {
            navigate("/");
        });
    };




    return (
        <div>
        <form>
            <fieldset>
                <div>
                    <section>
                        <label htmlFor="productImage">Photo</label>
                        <div></div>
                        <input
                          required
                          autoFocus
                          type="string"
                          value={product.image}
                          onChange={(evt) => {
                            const copy = { ...product };
                            copy.image = evt.target.value;
                            setProduct(copy)
                          }}
                          />                          
                    </section>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <section>
                        <label htmlFor="product">Name</label>
                        <div></div>
                        <input
                          required
                          autoFocus
                          type="string"
                          value={product.name}
                          onChange={(evt) => {
                            const copy = { ...product };
                            copy.name = evt.target.value;
                            setProduct(copy)
                          }}
                          />                          
                    </section>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <section>
                        <label htmlFor="product">Category</label>
                        <div></div>
                        <input
                          required
                          autoFocus
                          type="string"
                          value={product.category}
                          onChange={(evt) => {
                            const copy = { ...product };
                            copy.category = evt.target.value;
                            setProduct(copy)
                          }}
                          />                          
                    </section>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <section>
                        <label htmlFor="productImage">Description</label>
                        <div></div>
                        <input
                          required
                          autoFocus
                          type="string"
                          value={product.description}
                          onChange={(evt) => {
                            const copy = { ...product };
                            copy.description = evt.target.value;
                            setProduct(copy)
                          }}
                          />                          
                    </section>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <section>
                        <label htmlFor="productImage">Price</label>
                        <div></div>
                        <input
                          required
                          autoFocus
                          type="string"
                          value={product.price}
                          onChange={(evt) => {
                            const copy = { ...product };
                            copy.price = evt.target.value;
                            setProduct(copy)
                          }}
                          />                          
                    </section>
                </div>
            </fieldset>
            <div>
                <button onClick={(clickEvent) => {handleSaveButtonClick(clickEvent)}}>Add Product</button>
            </div>
        </form>
        </div>
    )
}