// @ts-nocheck
class TimeUtcElement extends HTMLElement {
  #interval;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
  }

  #padStartNumber(number: number) {
    return `0${number}`.slice(-2);
  }

  async #getTemporal() {
    // console.log("temporal not supported by browser, loading polyfill");
    const { Temporal } =
      await import("https://esm.sh/temporal-polyfill-lite@0.4.0/es2022/temporal-polyfill-lite.mjs");

    window.Temporal = Temporal;
  }

  #theTimeString() {
    const { hour, minute, second } = this.now;

    return `<span part="number">${this.#padStartNumber(hour)}</span><span part="seperator">:</span><span part="number">${this.#padStartNumber(minute)}</span>${!this.hideSeconds ? `<span part="seperator">:</span><span part="number">${this.#padStartNumber(second)}</span>` : ""}`;
  }

  #getTimeDifference() {
    const hours = this.diff;

    return `${hours > 0 ? `+${hours}` : hours}`;
  }

  #nanoSecondsToHours(offset) {
    return offset.offsetNanoseconds / 1_000_000_000 / 60 / 60;
  }

  #getTimeDifferenceInHours() {
    const computerTime = Temporal.Now.zonedDateTimeISO();
    const { hour, minute, second } = computerTime;

    console.log({ hour, minute, second });

    const tzTime = computerTime.withTimeZone(this.tz);

    const computerTimeTimeOffsetHours = this.#nanoSecondsToHours(computerTime);
    const tzTimeOffsetHours = this.#nanoSecondsToHours(tzTime);

    return tzTimeOffsetHours - computerTimeTimeOffsetHours;
  }

  #printTime() {
    this.now = Temporal.Now.plainTimeISO(this.tz);

    if (this.showDifference) {
      this.diff = this.#getTimeDifferenceInHours();
    }

    this.shadow.innerHTML = `
			${this.label && this.label !== "" ? `<p part="label">${this.label}</p>` : ""}
			<time part="time">${this.#theTimeString()}</time>
			${this.showDifference ? `<small part="time-difference">${this.#getTimeDifference()}</small>` : ""}
		`;
  }

  async connectedCallback() {
    if (!window.Temporal) {
      // console.log("need the polyfill");
      await this.#getTemporal();
    }

    this.tz = this.getAttribute("tz") || undefined;
    this.hideSeconds = this.hasAttribute("hide-seconds");
    this.label = this.getAttribute("label");
    this.showDifference = this.hasAttribute("show-difference");

    this.#printTime(); // first render. i.e. before the interval

    this.#interval = setInterval(() => this.#printTime(), 1_000); // every 1s
  }

  disconnectedCallback() {
    clearInterval(this.#interval);
  }
}

customElements.define("time-in", TimeUtcElement);

export default TimeUtcElement;
