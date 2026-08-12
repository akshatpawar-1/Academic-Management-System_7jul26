import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import academic1 from "../assets/images/academic-1.png";
import academic2 from "../assets/images/academic-2.png";
import academic3 from "../assets/images/academic-3.png";
import academic4 from "../assets/images/academic-4.png";

const slides = [academic1, academic2, academic3, academic4];

function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentSlide((previous) =>
                previous === slides.length - 1 ? 0 : previous + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused]);

    const nextSlide = () => {
        setCurrentSlide((previous) =>
            previous === slides.length - 1 ? 0 : previous + 1
        );
    };

    const previousSlide = () => {
        setCurrentSlide((previous) =>
            previous === 0 ? slides.length - 1 : previous - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <>
            <div className="home">

                <section
                    className="hero-slider"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >

                    <div
                        className="hero-slide-track"
                        style={{
                            transform: `translateX(-${currentSlide * 100}%)`,
                        }}
                    >
                        {slides.map((image, index) => (
                            <div
                                key={index}
                                className="hero-slide"
                                style={{
                                    backgroundImage: `url(${image})`,
                                }}
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        className="slider-btn previous"
                        onClick={previousSlide}
                        aria-label="Previous slide"
                    >
                        &#10094;
                    </button>

                    <button
                        type="button"
                        className="slider-btn next"
                        onClick={nextSlide}
                        aria-label="Next slide"
                    >
                        &#10095;
                    </button>

                    <div className="slider-dots">

                        {slides.map((_, index) => (
                            <button
                                type="button"
                                key={index}
                                className={`slider-dot ${
                                    index === currentSlide ? "active" : ""
                                }`}
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}

                    </div>

                </section>

                <section className="home-info">

                    <h2>Academic Management System</h2>

                    <p>
                        A centralized platform for managing students,
                        academic performance, reports and educational
                        records efficiently.
                    </p>

                    <div className="home-cards">

                        <div className="home-card">
                            <h3>Student Management</h3>

                            <p>
                                Manage student profiles, information and
                                academic records from one place.
                            </p>
                        </div>

                        <div className="home-card">
                            <h3>Marks Management</h3>

                            <p>
                                Add, track semester-wise marks,
				and update/delete records.
                            </p>
                        </div>

                        <div className="home-card">
                            <h3>Academic Reports</h3>

                            <p>
                                Generate and preview semester-wise academic
                                reports cards.
                            </p>
                        </div>

                    </div>

                </section>

            </div>

            <Footer />
        </>
    );
}

export default Home;