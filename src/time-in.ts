interface TimeIn {
  isTwentyFour?: boolean;
  showDifference?: boolean;
  hideSeconds?: boolean;
}

class TimeIn extends HTMLElement {
  #interval?: undefined | ReturnType<typeof setTimeout>;
  #shadow: ShadowRoot;
  #now?: Temporal.PlainTime;
  // Props
  #hideSeconds?: boolean;
  #showDifference?: boolean;
  #isTwelveHours?: boolean;

  #diff?: number;
  #tz?: string;
  #label?: string;

  constructor() {
    super();

    this.#shadow = this.attachShadow({ mode: "open" });
  }

  #padStartNumber(number: number) {
    return `0${number}`.slice(-2);
  }

  async #getTemporal() {
    const { Temporal } =
      // @ts-expect-error yes this is a valid url. But do I want to include in the js files?
      await import("https://esm.sh/temporal-polyfill-lite@0.4.0/es2022/temporal-polyfill-lite.mjs");

    window.Temporal = Temporal;
  }

  #theTimeString() {
    if (!this.#now) {
      return "";
    }

    const { hour, minute, second } = this.#now;
    const hours = this.#isTwelveHours
      ? (hour % 12).toString()
      : this.#padStartNumber(hour);
    let suffix = "";
    if (this.#isTwelveHours) {
      suffix = hour > 12 ? "pm" : "am";
    }

    return `<span part="number">${hours}</span><span part="seperator">:</span><span part="number">${this.#padStartNumber(minute)}</span>${!this.#hideSeconds ? `<span part="seperator">:</span><span part="number">${this.#padStartNumber(second)}</span>` : ""}${suffix !== "" ? `<span part="suffix">${suffix}</span>` : ""}`;
  }

  #nanoSecondsToHours(offset: Temporal.ZonedDateTime) {
    return offset.offsetNanoseconds / 1_000_000_000 / 60 / 60;
  }

  #getTimeDifferenceInHours() {
    if (typeof this.#tz === "undefined") {
      return 0;
    }

    const computerTime = Temporal.Now.zonedDateTimeISO();

    const tzTime = computerTime.withTimeZone(this.#tz);

    const computerTimeTimeOffsetHours = this.#nanoSecondsToHours(computerTime);
    const tzTimeOffsetHours = this.#nanoSecondsToHours(tzTime);

    const diffHours = tzTimeOffsetHours - computerTimeTimeOffsetHours;

    return diffHours > 0 ? "+" + diffHours : diffHours;
  }

  #printTime() {
    this.#now = Temporal.Now.plainTimeISO(this.#tz);

    const timeSelector = this.shadowRoot?.querySelector("time");

    if (timeSelector) {
      timeSelector.innerHTML = this.#theTimeString()!;
    }
  }

  async connectedCallback() {
    if (!window.Temporal) {
      await this.#getTemporal();
    }

    this.#tz = this.getAttribute("tz") || undefined;
    this.#hideSeconds = this.hasAttribute("hide-seconds");
    this.#label = this.getAttribute("label") || undefined;
    this.#showDifference = this.hasAttribute("show-difference");
    this.#isTwelveHours = this.hasAttribute("twelve-hours");

    this.#printTime(); // first render. i.e. before the interval

    if (this.#showDifference) {
      /* @ts-expect-error TODO: fixme */
      this.#diff = this.#getTimeDifferenceInHours();
    }

    this.#shadow.innerHTML = `
			${this.#label && this.#label !== "" ? `<p part="label">${this.#label}</p>` : ""}
			<time part="time">${this.#theTimeString()}</time>
			${this.#showDifference ? `<small part="time-difference">${this.#diff}</small>` : ""}
		`;

    this.#interval = setInterval(() => this.#printTime(), 1_000); // every 1s
  }

  disconnectedCallback() {
    clearInterval(this.#interval);
  }
}

customElements.define("time-in", TimeIn);

export default TimeIn;
