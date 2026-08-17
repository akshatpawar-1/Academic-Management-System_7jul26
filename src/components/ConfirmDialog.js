import React from "react";

function ConfirmDialog({
    show,
    title,
    message,
    onConfirm,
    onCancel,
}) {
    if (!show) {
        return null;
    }

    return (
        <div className="confirm-dialog">

            <h2>{title || "Confirm"}</h2>

            <p>
                {message || "Are you sure you want to continue?"}
            </p>

            <div className="confirm-buttons">

                <button
                    type="button"
                    className="confirm-yes"
                    onClick={onConfirm}
                >
                    Yes
                </button>

                <button
                    type="button"
                    className="confirm-no"
                    onClick={onCancel}
                >
                    No
                </button>

            </div>

        </div>
    );
}

export default ConfirmDialog;