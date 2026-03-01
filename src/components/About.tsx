import { Card, CardContent } from "./ui/card";
import CornerFrame from "./ui/cornerframe";

function Box({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-xs text-gray-500 mb-1">{title}</div>
      <div className="w-24 h-20 bg-gray-100 border rounded-lg" />
    </div>
  );
}

export default function CachGhepChu() {
  return (
    <Card className="rounded-2xl shadow mt-6 col-span-2">
      <CardContent className="p-6 space-y-8">

        {/* Title */}
        <h2 className="text-lg font-semibold">Cách ghép chữ</h2>

        {/* ================= 2 CỘT ================= */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* ========= BẬC ÂM ========= */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Bậc âm</h3>

           <CornerFrame variant="am">
            <div className="flex gap-4">
                <Box title="Cán tự (phụ âm đầu)" />
                <Box title="Chi tự (âm vần)" />
            </div>
            </CornerFrame>


            <p className="text-sm text-gray-600">
              Ký hiệu bậc âm trong bản gốc giống hình trăng khuyết.
              Cách viết có thể tròn hoặc vuông, miễn dễ phân biệt.
            </p>
          </div>

          {/* ========= BẬC DƯƠNG ========= */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Bậc dương</h3>

            <CornerFrame variant="duong">
                <div className="flex gap-4">
                    <Box title="Cán tự (phụ âm đầu)" />
                    <Box title="Chi tự (âm vần)" />
                </div>
            </CornerFrame>


            <p className="text-sm text-gray-600">
              Ký hiệu bậc dương giống hình trăng tròn.
            </p>
          </div>
        </div>

        {/* ================= RULES ================= */}
        <div className="bg-gray-100 rounded-xl p-4 text-sm space-y-2 max-w-md">
          <p><b>Khứ （去）:</b> kết thúc bằng “ng”, “nh”, “m”, “n”</p>
          <p><b>Nhập（入）:</b> kết thúc bằng “c”, “ch”, “p”, “t”</p>
        </div>

        {/* ================= VÍ DỤ ================= */}
        <div className="text-sm space-y-1">
          <p><b>Sắc khứ:</b> cáng, cánh, cám, cán</p>
          <p><b>Sắc nhập:</b> các, cách, cáp, cát</p>
          <p><b>Nặng khứ:</b> cạng, cạnh, cạm, cạn</p>
          <p><b>Nặng nhập:</b> cạc, cạch, cạp, cạt</p>
        </div>

        {/* ================= GHI CHÚ ================= */}
        <div className="text-sm text-gray-600">
          Để phân biệt từ nước ngoài, có thể đảo vị trí <b>chi + cán</b>
          thay vì <b>cán + chi</b> (ví dụ: vi-đê-ô, pi-gia...).
        </div>

      </CardContent>
    </Card>
  );
}
