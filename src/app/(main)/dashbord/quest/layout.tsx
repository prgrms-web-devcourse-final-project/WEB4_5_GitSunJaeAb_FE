export const metadata = {
  title: '퀘스트',
};

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {children}
        {modal}
      </div>
    </>
  );
}
