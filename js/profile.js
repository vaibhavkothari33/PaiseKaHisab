const del_id = document.querySelector("#delete-data")
del_id.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
})