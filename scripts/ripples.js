export default {
  rippleTimeout: "",
  rippleEnd: false,
  rippleTransition: "",

  getElementSize: (element) => ({
    height: Number(
      window
        .getComputedStyle(element)
        .getPropertyValue("height")
        .replace(/px/gi, "")
    ),
    width: Number(
      window
        .getComputedStyle(element)
        .getPropertyValue("width")
        .replace(/px/gi, "")
    )
  }),
  getElementsStyles: (element, style) => {
    return window.getComputedStyle(element).getPropertyValue(style);
  },
  start: function (event) {
    event.stopPropagation();
    const conditionForRunTheRipple = this.getElementsStyles(
      event.target,
      "--rp-color"
    );
    if (conditionForRunTheRipple) {
      this.rippleTransition = this.getElementsStyles(
        event.target,
        "--rp-transition"
      );
      const options = {
        size: (
          Math.sqrt(
            Math.pow(this.getElementSize(event.target).width, 2) +
              Math.pow(this.getElementSize(event.target).height, 2)
          ) / 4
        ).toFixed(0),
        color: this.getElementsStyles(event.target, "--rp-color"),
        transition: this.rippleTransition,
        halfHeight: event.target.offsetHeight / 2,
        halfWidth: event.target.offsetWidth / 2
      };
      this.rippleTimeout = setTimeout(() => {
        this.rippleEnd = true;
      }, this.rippleTransition);
      this.create(event, options);
    }
  },
  create: function (event, options) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    event.target.appendChild(ripple);
    const touchData = () => ({
      top: Number(
        Math.abs(event.target.getBoundingClientRect().top - event.clientY)
      ),
      bottom: Number(
        Math.abs(event.target.getBoundingClientRect().bottom - event.clientY)
      ),
      left: Number(
        Math.abs(event.target.getBoundingClientRect().left - event.clientX)
      ),
      right: Number(
        Math.abs(event.target.getBoundingClientRect().right - event.clientX)
      )
    });
    const formula = () => {
      return {
        a: Math.sqrt(touchData().bottom ** 2 + touchData().right ** 2),
        b: Math.sqrt(touchData().bottom ** 2 + touchData().left ** 2),
        c: Math.sqrt(touchData().top ** 2 + touchData().right ** 2),
        d: Math.sqrt(touchData().top ** 2 + touchData().left ** 2)
      };
    };
    const calculateScale = () => {
      return touchData().top <= options.halfHeight &&
        touchData().left <= options.halfWidth
        ? formula().a
        : touchData().top < options.halfHeight &&
          touchData().left > options.halfWidth
        ? formula().b
        : touchData().top > options.halfHeight &&
          touchData().left < options.halfWidth
        ? formula().c
        : touchData().top > options.halfHeight &&
          touchData().left > options.halfWidth
        ? formula().d
        : formula().d;
    };
    ripple.style.top = `${touchData().top - options.size / 2}px`;
    ripple.style.left = `${touchData().left - options.size / 2}px`;
    ripple.style.willChange = "transform border-radius width height top left";
    ripple.style.backgroundColor = options.color;
    ripple.style.transform = `scale(${calculateScale() / (options.size / 2)})`;
    ripple.style.width = `${options.size}px`;
    ripple.style.height = `${options.size}px`;
    ripple.style.borderRadius = "100%";
    ripple.style.position = "absolute";
    ripple.style.pointerEvents = "none";
    ripple.style.opacity = "1";
    ripple.style.transition = `opacity ease 0.4s, transform ease ${options.transition}ms`;
  },
  end: function (event) {
    const conditionForRunTheRipple = this.getElementsStyles(
      event.target,
      "--rp-color"
    );
    if (conditionForRunTheRipple) {
      event.stopPropagation();
      document.querySelectorAll(".ripple").forEach((ripple, index) => {
        if (this.rippleEnd) {
          ripple.style.opacity = "0";
          ripple.style.transition = "opacity ease 0.4s";
          ripple.addEventListener("transitionend", () => {
            ripple.remove();
          });
        } else {
          setTimeout(() => {
            ripple.style.opacity = "0";
            ripple.style.transition = "opacity ease 0.4s";
            ripple.addEventListener("transitionend", () => {
              ripple.remove();
            });
          }, this.rippleTransition);
        }
        clearTimeout(this.rippleTimeout);
        this.rippleEnd = false;
      });
    }
  }
};
