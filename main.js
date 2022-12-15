const MONTHS = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

const locale = "es";
// const yearDate = 2022;

(() => {
  const form = document.getElementById("myForm");
  const renderCalendar = document.getElementById("renderCalendar");

  const inputMonth = document.getElementById("month");
  inputMonth.addEventListener("change", (i) => {
    const valueMonth = i.target.value;
    // console.log(valueI);
    const valueIs = MONTHS[valueMonth.toLowerCase()];
    if (
      !(
        valueIs !== undefined &&
        valueIs >= 0 &&
        valueIs <= 11 &&
        valueIs !== ""
      )
    ) {
      inputMonth.style.backgroundColor = "red";
    } else {
      inputMonth.style.backgroundColor = "green";
    }
  });

  const inputYear = document.getElementById("year");
  inputYear.addEventListener("change", (i) => {
    const valueYear = i.target.value;

    const year = Number(valueYear);
    const condicionYaer = year !== "" && !isNaN(year) && year >= 1970;
    if (condicionYaer) {
      inputYear.style.backgroundColor = "green";
    } else {
      inputYear.style.backgroundColor = "red";
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    checkData(Object.fromEntries(formData));
  });

  const checkData = ({ month, year }) => {
    renderCalendar.innerText = "";
    const isExistsYear = yearExists(year);
    if (!isExistsYear) {
      renderCalendar.innerText = `El dato (${
        year ? year : "---"
      }) introducido no es un año valido.`;
      return;
    }

    const { isExistsMonth } = monthExists(month);
    if (month !== "" && !isExistsMonth) {
      renderCalendar.innerText = `El dato (${
        month ? month : "---"
      }) introducido no es un mes valido.`;
      return;
    }
    createCalendar(year, month);
  };

  //Check Month
  const monthExists = (month) => {
    month = MONTHS[month.toLowerCase()];
    return {
      isExistsMonth: month !== undefined && month >= 0 && month <= 11,
      monthName: month,
    };
  };

  // Check Year
  const yearExists = (year) => {
    const n = Number(year);
    return year !== "" && !isNaN(n) && n >= 1970;
  };

  const createCalendar = (year, month) => {
    renderCalendar.innerText = "";
    const { isExistsMonth, monthName } = monthExists(month);
    const oneMonth = false;
    if (isExistsMonth) {
      const oneMonth = true;
      createOneMonth(monthName, year, oneMonth);
    } else {
      for (let i = 0; i < 12; i++) {
        createAllMonths(i, year, oneMonth);
      }
    }
  };
  const createOneMonth = (month, year) => {
    //Contenedor Mes
    const boxMonth = document.createElement("div");
    boxMonth.classList.add("containerMonth");
    //Contenedor Dias de la semana y dias del mes
    const container = document.createElement("div");
    container.classList.add("boxMonth");
    const intl = new Intl.DateTimeFormat(locale, { month: "long" });
    const monthName = intl.format(new Date(year, month));

    //Un mes en concreto
    const title = document.createElement("h1");
    title.classList.add("h1Title");
    title.innerText = `${monthName} ${year}`;
    boxMonth.append(title);
    //

    getDaysWeek(locale, container);

    //Month Year Number
    const monthNumber = month;
    const yearNumber = year;

    getDaysMonth(monthNumber, yearNumber, container);
    boxMonth.append(container);
    renderCalendar.append(boxMonth);
  };

  const createAllMonths = (month, year) => {
    //Todo el Calendario H1
    const h1 = document.querySelector(".h1Calendar");
    h1.innerText = `Calendario de el año ${year}`;
    const boxMonth = document.createElement("div");
    boxMonth.classList.add("containerMonth");
    //Contenedor Dias de la semana y dias del mes
    const container = document.createElement("div");
    container.classList.add("boxMonth");
    const intl = new Intl.DateTimeFormat(locale, { month: "long" });
    const monthName = intl.format(new Date(year, month));

    //Un mes en concreto
    const title = document.createElement("h1");
    title.classList.add("h1Title");
    title.innerText = `${monthName}`;
    boxMonth.append(title);
    //

    getDaysWeek(locale, container);

    //Month Year Number
    const monthNumber = month;
    const yearNumber = year;

    getDaysMonth(monthNumber, yearNumber, container);
    boxMonth.append(container);
    renderCalendar.append(boxMonth);

  };
  //Pint Table Month
  // const createMonth = (month, year, oneMonth) => {
  //   //Todo el Calendario H1
  //   const h1 = document.querySelector(".h1Calendar");
  //   h1.innerText = `Calendario de el año ${year}`;
  //   //
  //   //Contenedor Mes
  //   const boxMonth = document.createElement("div");
  //   boxMonth.classList.add("containerMonth");
  //   //Contenedor Dias de la semana y dias del mes
  //   const container = document.createElement("div");
  //   container.classList.add("boxMonth");
  //   const intl = new Intl.DateTimeFormat(locale, { month: "long" });
  //   const monthName = intl.format(new Date(year, month));

  //   //Un mes en concreto
  //   const title = document.createElement("h1");
  //   title.classList.add("h1Title");
  //   title.innerText = `${monthName} ${year}`;
  //   boxMonth.append(title);
  //   //

  //   getDaysWeek(locale, container);

  //   //Month Year Number
  //   const monthNumber = month;
  //   const yearNumber = year;

  //   getDaysMonth(monthNumber, yearNumber, container);
  //   boxMonth.append(container);
  //   renderCalendar.append(boxMonth);
  // };

  const getDaysWeek = (locale, container) => {
    const intl = new Intl.DateTimeFormat(locale, { weekday: "long" });
    [...Array(7).keys()].map((day) => {
      const dayBox = document.createElement("div");
      dayBox.classList.add("day-name");
      dayBox.innerText = intl.format(new Date(1973, 0, day + 1));
      container.append(dayBox);
    });
  };

  const getDaysMonth = (month, year, container) => {
    const dayMonth = new Date(year, month + 1, 0).getDate();
    const startOn = new Date(year, month, 1).getDay();
    printDaysMonth(dayMonth, container, startOn, month, year);
  };

  //Imprimos los dias del mes
  const printDaysMonth = (dayMonth, container, startOn, month, year) => {
    for (let i = 0; i < dayMonth; i++) {
      const divDays = document.createElement("div");
      divDays.classList.add("divDays");
      //Dia Actual
      const d = new Date();
      const actualDay = d.getDate();

      const m = new Date();
      const actualMonth = m.getMonth();

      //Año Actual
      const y = new Date();
      const actualYear = y.getFullYear();
      if (i === 0) {
        divDays.style.gridColumnStart = startOn;
      }
      if (i === actualDay - 1 && actualMonth == month && year == actualYear) {
        divDays.style.cssText = "background-color:blue";
      }
      divDays.innerText = i + 1;
      container.append(divDays);
    }
  };
})();
