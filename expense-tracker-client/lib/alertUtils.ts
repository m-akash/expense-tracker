import Swal from "sweetalert2";

export const showSuccessAlert = (message: string) => {
  return Swal.fire({
    icon: "success",
    title: "Success!",
    text: message,
    timer: 2000,
    showConfirmButton: false,
    position: "top-end",
    toast: true,
  });
};

// Error Alert
export const showErrorAlert = (message: string) => {
  return Swal.fire({
    icon: "error",
    title: "Error!",
    text: message,
    timer: 3000,
    showConfirmButton: false,
    position: "top-end",
    toast: true,
  });
};

// Warning Alert
export const showWarningAlert = (message: string) => {
  return Swal.fire({
    icon: "warning",
    title: "Warning!",
    text: message,
    timer: 3000,
    showConfirmButton: false,
    position: "top-end",
    toast: true,
  });
};

// Confirmation Dialog - Updated for better mobile support with custom colors
export const showConfirmationDialog = (title: string, message: string) => {
  return Swal.fire({
    title: title,
    text: message,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    // Custom dark theme colors
    background: "#1F2937",
    color: "#60A5FA", // Message color
    // Mobile-friendly settings
    width: "90%",
    padding: "1rem",
    buttonsStyling: true,
    reverseButtons: false,
    focusConfirm: false,
    allowOutsideClick: false,
    allowEscapeKey: true,
    // Custom classes for better mobile styling and colors
    customClass: {
      popup: "mobile-confirmation-popup custom-dark-popup",
      title: "custom-title-color",
      confirmButton: "mobile-confirm-btn",
      cancelButton: "mobile-cancel-btn",
      actions: "mobile-actions",
    },
    // Ensure buttons are always shown
    showClass: {
      popup: "animate__animated animate__fadeIn",
    },
  });
};

// Loading Alert
export const showLoadingAlert = (message = "Loading...") => {
  return Swal.fire({
    title: message,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

// Close Loading Alert
export const closeLoadingAlert = () => {
  Swal.close();
};
