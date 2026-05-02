document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const btn = document.getElementById("submit-btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = "Sending…";
    status.style.display = "none";
    status.className = "form-status";

    const formData = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (res.ok) {
        status.textContent = "✓ Message sent! I'll get back to you within 24 hours.";
        status.classList.add("success");
        form.reset();
      } else {
        const data = await res.json();
        status.textContent = data.errors ? data.errors.map(e=>e.message).join(", ") : "Oops! Something went wrong. Please try again.";
        status.classList.add("error");
      }
    } catch {
      status.textContent = "Connection error. Please check your network and try again.";
      status.classList.add("error");
    }

    status.style.display = "block";
    btn.disabled = false;
    btn.textContent = "Send Message →";
  });
});
