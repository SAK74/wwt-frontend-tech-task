// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

if (!HTMLDialogElement.prototype.showModal) {
	HTMLDialogElement.prototype.showModal = function () {
		this.setAttribute('open', 'true')
	}
}
if (!HTMLDialogElement.prototype.close) {
	HTMLDialogElement.prototype.close = function () {
		this.removeAttribute('open')
	}
}
