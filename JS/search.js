function search() {
    const input = document.getElementById("inputsearch");
    const inputStr = input.value.toUpperCase();
    document.querySelectorAll('#table_bc tr:not(.header').forEach((tr) => {
        const anyMatch = [...tr.children]
            .some(td => td.textContent.toUpperCase().includes(inputStr));
        if (anyMatch) tr.style.removeProperty('display');
        else tr.style.display = 'none';
    });
  }