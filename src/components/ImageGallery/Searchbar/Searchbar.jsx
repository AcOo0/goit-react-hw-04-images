import { useState } from "react"

import styles from "./searchbar.module.css"

const Searchbar = ({ onSubmit }) => {
    const [state, setState] = useState({
        search: "",
    });

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setState({
            ...state,
            [name]: value,
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...state });
        reset();
    };

    const reset = () => {
        setState({ 
            search: "",
        });
    };

    return (
            <header className={styles.searchbar}>
                <form onSubmit={handleSubmit} className={styles.searchForm}>
                    <button type="submit" className={styles.searchFormButton}>
                        <span className={styles.searchFormButtonLabel}>Search</span>
                    </button>
                    <input
                        value={state.search}
                        onChange={handleChange}
                        className={styles.searchFormInput}
                        required
                        type="text"
                        name="search"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        )

}

export default Searchbar;