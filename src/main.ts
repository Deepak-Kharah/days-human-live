import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { LocalStorage } from "./localStorage";

dayjs.extend(relativeTime);
setup();

function setup() {
  const dobInput = document.getElementById("dob") as HTMLInputElement;

  const dob = LocalStorage.getDob();

  if (dob) {
    dobInput.value = dob;
  }
  updateDob(dobInput.value);

  // restrict future dates
  dobInput.setAttribute("max", dayjs().format("YYYY-MM-DD"));
  dobInput.addEventListener("input", onInput);
}

/**
 * Updates the calendar based on the input event.
 * If the years gone since the date of birth is less than 0, generates the calendar for today's date.
 * Otherwise, generates the calendar for the date of birth.
 *
 * @param event - The input event that triggered the update.
 */
function onInput(event: Event) {
  const element = event.target as HTMLInputElement;

  updateDob(element.value);
  LocalStorage.setDob(element.value);
}

function updateDob(dobString: string) {
  const today = dayjs();
  const dob = dayjs(dobString);
  const yearsGone = today.diff(dob, "year");

  if (yearsGone < 0) {
    generateCalendar(today);
  } else {
    generateCalendar(dob);
  }
}

function generateCalendar(dob: dayjs.Dayjs) {
  const today = dayjs();
  const weeksGone = today.diff(dob, "week");
  const yearsGone = dayjs().from(dayjs(dob), true);
  const yearDiffElement = document.getElementById(
    "years-diff"
  ) as HTMLSpanElement;
  yearDiffElement.innerText = yearsGone;

  const fragment = document.createDocumentFragment();

  let i = 0;

  for (let j = 0; j < 4; ++j) {
    const innerListFragment = document.createDocumentFragment();

    for (let l = 0; l < 1000; ++l) {
      const box = document.createElement("div");
      box.classList.add("box");
      if (i < weeksGone) {
        box.classList.add("fill");
      }
      innerListFragment.insertBefore(box, innerListFragment.firstChild);

      ++i;
    }

    const innerList = document.createElement("div");
    innerList.classList.add("innerlist");
    innerList.appendChild(innerListFragment);
    fragment.insertBefore(innerList, fragment.firstChild);
  }

  const container = document.getElementById("container") as HTMLDivElement;
  container.innerHTML = "";

  container.appendChild(fragment);
}
