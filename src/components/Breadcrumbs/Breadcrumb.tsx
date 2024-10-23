import Link from "next/link";

interface BreadcrumbProps {
  pageName: string;
  navigation: any;
  // [{ name: string; link: string }];
}

const Breadcrumb = ({ pageName, navigation }: BreadcrumbProps) => {
  // console.log(navigation)
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-[26px] font-bold leading-[30px] text-dark dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            {navigation.map((item:any, index:any) => (
              <span key={index}>
              <Link className="font-medium" href={item.link}>
                {item.name}
              </Link>
              {/* <Link className="font-medium" href={item.link}>
                {item.name}
              </Link> */}
              </span>
            ))}
          </li>
          {/* <li className="font-medium text-primary">{pageName}</li> */}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;

