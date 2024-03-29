import { NextResponse } from "next/server";
import { dataSlugPostVi } from "../utils/dataSlugPostVi";
import { dataSlugServiceAndServiceParent } from "../utils/dataSlugServiceAndServiceParent";
import { dataSlugServiceOld } from "../utils/dataSlugServiceOld";
import { dataListslugOld } from "../utils/dataListslugOld";

export function middleware(request) {
  const targetHost = "ondigitals.com";
  const urlMain = "https://ondigitals.com";
  const stringsToCheck = ["vi", "zh", "jp", "kr"];
  const host = request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") || "http"; // Sử dụng header "x-forwarded-proto" để xác định giao thức nếu bạn đang sử dụng proxy
  // Kiểm tra nếu giao thức không phải HTTPS hoặc host có tiền tố www
  if (protocol !== "https" || host.startsWith("www.")) {
    const redirectUrl = `https://${targetHost}${request.nextUrl.pathname}`;
    return NextResponse.redirect(redirectUrl, { status: 301 });
  }
  // function chuyển 301 các url bài viết tiếng việt
  const modifiedData = dataSlugPostVi.map((item) => ({
    slug: `/${item.slug}/`,
    slugNewVi: `${urlMain}/vi/${item.slug}/`,
  }));
  const matchedItem = modifiedData.find((item) => {
    return (
      request.nextUrl.pathname === item.slug &&
      !request.nextUrl.href.includes("vi")
    );
  });
  // Nếu tìm thấy phần tử
  if (matchedItem) {
    // Thực hiện chuyển hướng đến slugNewVi của phần tử đó
    return NextResponse.redirect(matchedItem.slugNewVi, {
      status: 301,
    });
  }
  // fuction 301 các services cho các ngôn ngữ
  const matchedItemService = dataSlugServiceAndServiceParent.find((item) => {
    return (
      request.nextUrl.pathname === `/${encodeURIComponent(item.slug)}/` &&
      !stringsToCheck.some((str) => request.nextUrl.href.includes(str))
    );
  });

  if (matchedItemService) {
    return NextResponse.redirect(
      `${urlMain}/${matchedItemService.language.code}/${encodeURIComponent(
        matchedItemService.slug
      )}/`,
      {
        status: 301,
      }
    );
  }
  // fuction 301 các services website cũ cho các ngôn ngữ
  const matchedItemServiceOld = dataSlugServiceOld.find((item) => {
    return (
      request.nextUrl.pathname === `/${encodeURIComponent(item.slugOld)}/` &&
      !stringsToCheck.some((str) => request.nextUrl.href.includes(str))
    );
  });
  if (matchedItemServiceOld) {
    const redirectUrl =
      matchedItemServiceOld.locale === "en"
        ? `${urlMain}/${encodeURIComponent(matchedItemServiceOld.slugNew)}/`
        : `${urlMain}/${matchedItemServiceOld.locale}/${encodeURIComponent(
            matchedItemServiceOld.slugNew
          )}/`;

    return NextResponse.redirect(redirectUrl, { status: 301 });
  }

  // fuction 301 các url của web cũ qua web mới không còn nữa chuyển về trang chủ
  const matchedSlugWebOld = dataListslugOld.find((item) => {
    return request.nextUrl.pathname === `/${encodeURIComponent(item.slug)}/`;
  });
  if (matchedSlugWebOld) {
    return NextResponse.redirect(`${urlMain}/`, {
      status: 301,
    });
  }

  return NextResponse.next();
}
