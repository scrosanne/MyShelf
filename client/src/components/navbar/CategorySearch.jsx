export default function CategorySearch({ setCategory }) {
    return (
        <div className="search">
            <select
                onChange={(e) => setCategory(e.currentTarget.value)}
                name="category"
                id="category"
            >
                <option value="all"># all</option>
                <option value="quote"># quote</option>
                <option value="thoughts"># thoughts</option>
                <option value="take away"># take away</option>
                <option value="storyline"># storyline</option>
                <option value="characters"># characters</option>
                <option value="best loved"># best loved</option>
                <option value="reads alike"># reads alike</option>
            </select>
        </div>
    );
}
