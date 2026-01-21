import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import './BackToTop.css'

function BackToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)

        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="back-to-top fade-in"
                    aria-label="Back to top"
                    title="Back to top"
                >
                    <ArrowUp size={20} />
                </button>
            )}
        </>
    )
}

export default BackToTop
