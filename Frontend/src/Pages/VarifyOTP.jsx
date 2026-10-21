import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { MdOutlineMarkEmailRead } from "react-icons/md";

const VerifyOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const inputRefs = useRef([]);

    // Guard: Redirect back to registration if email is absent
    useEffect(() => {
        if (!email) {
            navigate("/register", { replace: true });
        }
    }, [email, navigate]);

    // Resend countdown timer
    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (e, index) => {
        const val = e.target.value;
        // Take the last character entered so overwriting works cleanly
        const digit = val.slice(-1);

        if (digit && !/^\d$/.test(digit)) return;

        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);

        // Move to the next input if a digit was entered
        if (digit && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (!otp[index] && index > 0) {
                // If current box is already empty, jump to previous and clear it
                inputRefs.current[index - 1]?.focus();
                const newOtp = [...otp];
                newOtp[index - 1] = "";
                setOtp(newOtp);
            } else {
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData
            .getData("text")
            .trim()
            .slice(0, 6);

        if (!/^\d+$/.test(pasteData)) return;

        const digits = pasteData.split("");
        const newOtp = [...otp];

        digits.forEach((digit, index) => {
            if (index < 6) newOtp[index] = digit;
        });

        setOtp(newOtp);

        // Focus the next empty box, or the last box if full 6 digits are pasted
        const targetIndex = digits.length >= 6 ? 5 : digits.length;
        inputRefs.current[targetIndex]?.focus();
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        const otpValue = otp.join("");

        if (otpValue.length !== 6) {
            return setError("Please enter all 6 digits.");
        }

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const response = await axios.post(
                "https://prepwise-ai-backend-0ttv.onrender.com/verify-otp",
                {
                    email,
                    otp: otpValue,
                }
            );

            setSuccess(response.data.message || "Account verified successfully!");

            setTimeout(() => {
                navigate("/login");
            }, 1200);

        } catch (err) {
            setError(
                err.response?.data?.message || "Verification failed. Please check your code."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        try {
            setResendLoading(true);
            setError("");
            setSuccess("");

            const response = await axios.post(
                "https://prepwise-ai-backend-0ttv.onrender.com/resend-otp",
                { email }
            );

            setSuccess(response.data.message || "New OTP dispatched to your inbox.");
            setTimer(60);
            setOtp(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();

        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to resend OTP. Please try again."
            );
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-100 flex items-center justify-center px-4 py-8">
            <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-6 sm:p-8 w-full max-w-md border border-slate-100">
                <div className="flex justify-center mb-4">
                    <div className="bg-purple-100 p-4 rounded-full">
                        <MdOutlineMarkEmailRead
                            className="text-purple-600"
                            size={42}
                        />
                    </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-center text-slate-800">
                    Verify Email
                </h1>

                <p className="text-center text-slate-500 text-sm mt-2">
                    Enter the 6-digit verification code sent to
                </p>

                <p className="text-center font-semibold text-purple-600 break-all text-sm mt-0.5">
                    {email}
                </p>

                {error && (
                    <div className="text-red-500 text-xs sm:text-sm bg-red-50 border border-red-200 rounded-lg p-2.5 text-center mt-4">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="text-emerald-600 text-xs sm:text-sm bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-center mt-4">
                        {success}
                    </div>
                )}

                <form onSubmit={handleVerify} className="mt-6">
                    <div
                        className="flex justify-between gap-1.5 sm:gap-2.5"
                        onPaste={handlePaste}
                    >
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                pattern="\d*"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-11 h-13 sm:w-12 sm:h-14 border-2 border-slate-200 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 rounded-xl text-center text-xl sm:text-2xl font-bold outline-none text-slate-800 transition-all bg-white"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || otp.join("").length < 6}
                        className="w-full mt-6 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition-colors shadow-md"
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>

                <div className="text-center mt-5 text-sm">
                    {timer > 0 ? (
                        <p className="text-slate-500">
                            Resend code in{" "}
                            <span className="font-semibold text-purple-600">
                                {timer}s
                            </span>
                        </p>
                    ) : (
                        <button
                            type="button"
                            onClick={handleResendOTP}
                            disabled={resendLoading}
                            className="text-purple-600 font-semibold hover:underline disabled:opacity-50"
                        >
                            {resendLoading ? "Sending..." : "Resend OTP"}
                        </button>
                    )}
                </div>

                <div className="text-center mt-4">
                    <Link
                        to="/register"
                        className="text-xs sm:text-sm text-slate-500 hover:text-purple-600 transition-colors"
                    >
                        ← Back to Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VerifyOTP;