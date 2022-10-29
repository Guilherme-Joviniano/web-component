export default (e) => {
    let child = e.lastChild
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}