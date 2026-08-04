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

    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (
            e.key === "Backspace" &&
            !otp[index] && 
            index > 0 
        ) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();

        const paste = e.clipboardData
            .getData("text")
            .trim()
            .slice(0, 6);

        if (!/^\d+$/.test(paste)) return;

        const digits = paste.split("");

        const newOtp = [...otp];

        digits.forEach((digit, index) => {
            newOtp[index] = digit;
        });

        setOtp(newOtp);

        if (digits.length < 6) {
            inputRefs.current[digits.length].focus();
        }
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
                "http://localhost:5000/verify-otp",
                {
                    email,
                    otp: otpValue,
                }
            );

            setSuccess(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Verification failed."
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
                "http://localhost:5000/resend-otp",
                { email }
            );

            setSuccess(response.data.message);
            setTimer(60);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setResendLoading(false);
        }
    };

    return  (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-100 flex items-center justify-center px-4">

            <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-md">

                <div className="flex justify-center mb-5">

                    <div className="bg-purple-100 p-4 rounded-full">

                        <MdOutlineMarkEmailRead
                            className="text-purple-600"
                            size={45}
                        />

                    </div>

                </div>

                <h1 className="text-3xl font-bold text-center text-slate-800">
                    Verify Email
                </h1>

                <p className="text-center text-slate-500 mt-3">
                    Enter the verification code sent to
                </p>

                <p className="text-center font-semibold text-purple-600 break-all mt-1">
                    {email}
                </p>

                {error && (
                    <p className="text-red-500 text-center mt-5">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="text-green-600 text-center mt-5">
                        {success}
                    </p>
                )}

                <form
                    onSubmit={handleVerify}
                    className="mt-8"
                >

                    <div
                        className="flex justify-center gap-3"
                        onPaste={handlePaste}
                    >

                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) =>
                                    (inputRefs.current[index] = el)
                                }
                                value={digit}
                                onChange={(e) =>
                                    handleChange(
                                        e.target.value,
                                        index
                                    )
                                }
                                onKeyDown={(e) =>
                                    handleKeyDown(e, index)
                                }
                                maxLength={1}
                                className="w-10 h-12 sm:w-11 sm:h-13 md:w-12 md:h-14 w-8 h-10 border-2 rounded-xl text-center text-2xl font-bold outline-none focus:border-purple-600 transition"
                            />
                        ))}

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-8 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition"
                    >
                        {loading
                            ? "Verifying..."
                            : "Verify OTP"}
                    </button>

                </form>

                <div className="text-center mt-6">

                    {timer > 0 ? (
                        <p className="text-gray-500">
                            Resend OTP in{" "}
                            <span className="font-bold">
                                {timer}s
                            </span>
                        </p>
                    ) : (
                        <button
                            onClick={handleResendOTP}
                            disabled={resendLoading}
                            className="text-purple-600 font-semibold hover:underline"
                        >
                            {resendLoading
                                ? "Sending..."
                                : "Resend OTP"}
                        </button>
                    )}

                </div>

                <div className="text-center mt-6">

                    <Link
                        to="/register"
                        className="text-slate-500 hover:text-purple-600"
                    >
                        ← Back to Register
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default VerifyOTP;