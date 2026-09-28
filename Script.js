/* =========================================================
   LegalEase - Main JavaScript
   ========================================================= */

"use strict";


/* =========================================================
   DOM Ready
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeForm();

    initializeCharacterCounter();

    initializeCopyButton();

    initializePrintButton();

    initializeDocumentTypeHelper();

    initializeAnimations();

});


/* =========================================================
   Form Handling
   ========================================================= */

function initializeForm() {

    const form = document.getElementById("document-form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function (event) {

        const username =
            document.getElementById("username");

        const documentType =
            document.getElementById("document_type");

        const purpose =
            document.getElementById("purpose");

        const details =
            document.getElementById("details");


        /* -----------------------------
           Name validation
           ----------------------------- */

        if (!username || username.value.trim().length < 2) {

            event.preventDefault();

            showMessage(
                "Please enter your full name.",
                "error"
            );

            username?.focus();

            return;
        }


        /* -----------------------------
           Document type validation
           ----------------------------- */

        if (!documentType || !documentType.value) {

            event.preventDefault();

            showMessage(
                "Please select a document type.",
                "error"
            );

            documentType?.focus();

            return;
        }


        /* -----------------------------
           Purpose validation
           ----------------------------- */

        if (!purpose || purpose.value.trim().length < 10) {

            event.preventDefault();

            showMessage(
                "Please provide a more detailed purpose.",
                "error"
            );

            purpose?.focus();

            return;
        }


        /* -----------------------------
           Details validation
           ----------------------------- */

        if (!details || details.value.trim().length < 10) {

            event.preventDefault();

            showMessage(
                "Please provide the relevant document details.",
                "error"
            );

            details?.focus();

            return;
        }


        /* -----------------------------
           Submit loading state
           ----------------------------- */

        showLoadingState();

    });

}


/* =========================================================
   Character Counter
   ========================================================= */

function initializeCharacterCounter() {

    const details =
        document.getElementById("details");

    const counter =
        document.getElementById("character-count");


    if (!details || !counter) {
        return;
    }


    function updateCounter() {

        const length =
            details.value.length;

        const maximum =
            details.maxLength || 10000;


        counter.textContent =
            `${length} / ${maximum}`;


        if (length > maximum * 0.9) {

            counter.classList.add("warning");

        } else {

            counter.classList.remove("warning");

        }


        if (length >= maximum) {

            counter.classList.add("danger");

        } else {

            counter.classList.remove("danger");

        }

    }


    details.addEventListener(
        "input",
        updateCounter
    );


    updateCounter();

}


/* =========================================================
   Loading State
   ========================================================= */

function showLoadingState() {

    const button =
        document.getElementById("generate-button");

    const buttonText =
        document.getElementById("button-text");

    const buttonLoader =
        document.getElementById("button-loader");


    if (!button) {
        return;
    }


    button.disabled = true;

    button.classList.add("loading");


    if (buttonText) {

        buttonText.hidden = true;

    }


    if (buttonLoader) {

        buttonLoader.hidden = false;

    }

}


/* =========================================================
   Copy Generated Document
   ========================================================= */

function initializeCopyButton() {

    const copyButton =
        document.getElementById("copy-document");

    const documentElement =
        document.getElementById("generated-document");


    if (!copyButton || !documentElement) {
        return;
    }


    copyButton.addEventListener(
        "click",
        async function () {

            const text =
                documentElement.innerText.trim();


            if (!text) {

                showMessage(
                    "There is no document content to copy.",
                    "error"
                );

                return;

            }


            try {

                await navigator.clipboard.writeText(text);


                const originalText =
                    copyButton.textContent;


                copyButton.textContent =
                    "Copied!";


                copyButton.classList.add(
                    "success-button"
                );


                showMessage(
                    "Document copied to your clipboard.",
                    "success"
                );


                setTimeout(function () {

                    copyButton.textContent =
                        originalText;

                    copyButton.classList.remove(
                        "success-button"
                    );

                }, 2000);


            } catch (error) {

                /* Fallback for older browsers */

                copyTextFallback(text);

            }

        }
    );

}


/* =========================================================
   Clipboard Fallback
   ========================================================= */

function copyTextFallback(text) {

    const textarea =
        document.createElement("textarea");


    textarea.value = text;

    textarea.style.position = "fixed";

    textarea.style.left = "-999999px";

    textarea.style.top = "-999999px";


    document.body.appendChild(
        textarea
    );


    textarea.focus();

    textarea.select();


    try {

        document.execCommand("copy");

        showMessage(
            "Document copied to your clipboard.",
            "success"
        );

    } catch (error) {

        showMessage(
            "Unable to copy the document.",
            "error"
        );

    }


    document.body.removeChild(
        textarea
    );

}


/* =========================================================
   Print Document
   ========================================================= */

function initializePrintButton() {

    const printButton =
        document.getElementById("print-document");


    if (!printButton) {
        return;
    }


    printButton.addEventListener(
        "click",
        function () {

            window.print();

        }
    );

}


/* =========================================================
   Document Type Helper
   ========================================================= */

function initializeDocumentTypeHelper() {

    const select =
        document.getElementById("document_type");

    const purpose =
        document.getElementById("purpose");

    const details =
        document.getElementById("details");


    if (!select || !purpose || !details) {
        return;
    }


    const suggestions = {

        "Rental Agreement": {

            purpose:
                "Residential rental agreement between a landlord and tenant",

            details:
                "Landlord name:\n" +
                "Tenant name:\n" +
                "Property address:\n" +
                "Monthly rent:\n" +
                "Security deposit:\n" +
                "Lease duration:\n" +
                "Rent due date:\n" +
                "Utilities responsibility:\n" +
                "Special conditions:"

        },


        "Employment Contract": {

            purpose:
                "Employment agreement between an employer and employee",

            details:
                "Employer name:\n" +
                "Employee name:\n" +
                "Job title:\n" +
                "Job responsibilities:\n" +
                "Start date:\n" +
                "Salary:\n" +
                "Working hours:\n" +
                "Benefits:\n" +
                "Notice period:\n" +
                "Special conditions:"

        },


        "NDA": {

            purpose:
                "Agreement to protect confidential business information",

            details:
                "Disclosing party:\n" +
                "Receiving party:\n" +
                "Confidential information:\n" +
                "Purpose of disclosure:\n" +
                "Duration of confidentiality:\n" +
                "Permitted disclosures:\n" +
                "Special conditions:"

        },


        "Power of Attorney": {

            purpose:
                "Authorization for another person to act on behalf of the principal",

            details:
                "Principal name:\n" +
                "Agent name:\n" +
                "Agent address:\n" +
                "Powers granted:\n" +
                "Effective date:\n" +
                "Expiration date:\n" +
                "Limitations:\n" +
                "Special conditions:"

        },


        "Affidavit": {

            purpose:
                "Sworn statement concerning specific facts or circumstances",

            details:
                "Affiant name:\n" +
                "Address:\n" +
                "Statement of facts:\n" +
                "Relevant dates:\n" +
                "Supporting information:\n" +
                "Purpose of affidavit:"

        },


        "Legal Notice": {

            purpose:
                "Formal legal notice concerning a dispute or legal matter",

            details:
                "Sender name:\n" +
                "Recipient name:\n" +
                "Recipient address:\n" +
                "Subject:\n" +
                "Relevant facts:\n" +
                "Dates:\n" +
                "Requested action:\n" +
                "Deadline for response:\n" +
                "Additional information:"

        }

    };


    select.addEventListener(
        "change",
        function () {

            const selected =
                select.value;


            const suggestion =
                suggestions[selected];


            if (!suggestion) {
                return;
            }


            /*
             * Only populate empty fields.
             * This prevents overwriting information
             * that the user has already entered.
             */

            if (!purpose.value.trim()) {

                purpose.value =
                    suggestion.purpose;

            }


            if (!details.value.trim()) {

                details.value =
                    suggestion.details;


                details.dispatchEvent(
                    new Event("input")
                );

            }

        }
    );

}


/* =========================================================
   Toast / Message System
   ========================================================= */

function showMessage(
    message,
    type = "info"
) {

    const existing =
        document.getElementById(
            "legalease-message"
        );


    if (existing) {

        existing.remove();

    }


    const messageElement =
        document.createElement("div");


    messageElement.id =
        "legalease-message";


    messageElement.className =
        `toast-message ${type}`;


    messageElement.textContent =
        message;


    document.body.appendChild(
        messageElement
    );


    requestAnimationFrame(
        function () {

            messageElement.classList.add(
                "show"
            );

        }
    );


    setTimeout(
        function () {

            messageElement.classList.remove(
                "show"
            );


            setTimeout(
                function () {

                    messageElement.remove();

                },
                300
            );

        },
        3500
    );

}


/* =========================================================
   Scroll Animations
   ========================================================= */

function initializeAnimations() {

    const elements =
        document.querySelectorAll(
            ".document-card, .step, .generator-card"
        );


    if (!elements.length) {
        return;
    }


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.1
            }
        );


    elements.forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   Confirm Before Leaving During Generation
   ========================================================= */

let documentGenerating = false;


window.addEventListener(
    "beforeunload",
    function (event) {

        if (!documentGenerating) {
            return;
        }


        event.preventDefault();

        event.returnValue = "";

    }
);


/* =========================================================
   Update Generation State
   ========================================================= */

document.addEventListener(
    "submit",
    function (event) {

        if (
            event.target &&
            event.target.id === "document-form"
        ) {

            documentGenerating = true;

        }

    }
);


/* =========================================================
   Keyboard Accessibility
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        /*
         * Ctrl/Cmd + Enter submits the generator form.
         */

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key === "Enter"
        ) {

            const form =
                document.getElementById(
                    "document-form"
                );


            if (form) {

                form.requestSubmit();

            }

        }

    }
);
