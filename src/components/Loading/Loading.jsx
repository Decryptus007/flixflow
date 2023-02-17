import './styles.css'

export function ButtonLoader() {
  return (
    <div className="lds-dual-ring after:w-[20px] after:h-[20px]"></div>
  )
}

function Loading() {
  return (
    <div className="fixed top-0 left-0 z-[100] bg-neutral-900 h-screen w-screen flex items-center justify-center">
      <div className="loader">Loading...</div>
    </div>
  )
}

export default Loading