type Props = {
  children: React.ReactNode;
};
const PageWrapper = ({children}:Props) => {
  return (
    <main className="max-w-md mx-auto mt-8">{children}</main>
  )
}

export default PageWrapper