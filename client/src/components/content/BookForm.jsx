import { useState, useRef } from "react";

export default function BookForm({ getAllBooks, books }) {
    const [error, setError] = useState("");
    const [input, setInput] = useState({});
    const bookForm = useRef();

    const submitHover = () => {
        bookForm.current.style.border = "1px solid black";
    };
    const submitLeave = () => {
        bookForm.current.style.border = "2px dashed black";
    };

    const handleInputChange = (e) => {
        const text = e.currentTarget.value;
        setInput({
            ...input,
            [e.currentTarget.name]: text,
        });
    };

    const handleSubmit = () => {
        //check for complete input
        if (!input.author || !input.title) {
            setError("forgot something?");
            return;
        }

        //returns undefined if book does not yet exist
        const doubleItem = books.find(
            (book) =>
                book.author === input.author.toUpperCase() &&
                book.title === input.title.toUpperCase()
        );

        if (doubleItem !== undefined) {
            setError("book already exists!");
            return;
        }

        fetch("/book", {
            method: "POST",
            body: JSON.stringify(input), //stringify object with form input
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.success === true) {
                    getAllBooks();
                    setInput({ author: "", title: "" });
                } else {
                    setError("pls try again");
                }
            });
    };

    return (
        <div className="book-form" ref={bookForm}>
            <p className="error-book-form">{error}</p>
            <textarea
                type="text"
                name="author"
                placeholder="AUTHOR"
                onChange={(e) => handleInputChange(e)}
                value={input.author}
            ></textarea>

            <textarea
                type="text"
                name="title"
                placeholder="TITLE"
                onChange={(e) => handleInputChange(e)}
                value={input.title}
            ></textarea>

            <button
                onClick={() => handleSubmit()}
                onMouseEnter={() => submitHover()}
                onMouseLeave={() => submitLeave()}
            >
                submit
            </button>
        </div>
    );
}
