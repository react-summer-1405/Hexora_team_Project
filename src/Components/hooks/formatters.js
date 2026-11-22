export const formatNumber = (n = 0) => Number(n).toLocaleString("fa-IR");

export const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";