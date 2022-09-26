document.getElementById("deleteModal").addEventListener("show.bs.modal", function (event) {
  document.getElementById("linkToDelete").setAttribute("href", "/pdf/deletePDF/" + event.relatedTarget.id);
});