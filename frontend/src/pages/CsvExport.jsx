function CsvExport(products){
  const headers = ["ID", "Nom", "Description", "Prix", "Quantité", "Seuil Min"];
  const rows = products.map(p => [p.id, p.name, p.description, p.price, p.quantity, p.minQuantity]);

  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.setAttribute("href", url);
  link.setAttribute("download", "produits.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default CsvExport;