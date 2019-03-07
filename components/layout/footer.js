import React from "react"

export const CopyRight = () => {
    const author = "@burhanmubarok"
    const year = new Date().getFullYear()
    return (
        <div className="footer">
            Copyright {author} {year}
        </div>
    )
}

const Footer = () => (
    <span>
        <CopyRight />
    </span>
)

export default Footer