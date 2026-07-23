import ebBlack from '../../assets/icons/eb_black.png'
export default function HeaderText() {
    return (
        <a
            href="/"
            className="flex h-10 items-center gap-2 rounded-full bg-white px-3 sm:px-4 border border-[var(--border)] shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-[var(--border-hover)]  active:translate-y-0 active:scale-[0.985] active:shadow-[0_4px_14px_rgba(0,0,0,0.14)] focus:outline-none focus:ring-2 focus:ring-black/10"
        >
            <img src={ebBlack} alt="EB" className="h-8 w-auto justify-self-start" />
            <span className="hidden font-bold tracking-tight text-black sm:inline">React Template</span>
        </a>
    )
}