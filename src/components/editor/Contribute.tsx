/* eslint-disable react-hooks/globals */
import { Card, CardContent } from "../ui/card";


export default function FontTabs() {

    return (
        <>
            <Card className="rounded-2xl shadow mt-6">
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-lg font-semibold">Giới thiệu Quốc Âm Tân Tự</h2>

                    <p className="text-sm text-gray-700 leading-relaxed">
                        Quốc Âm Tân Tự (&quot;chữ quốc âm mới&quot;, chữ Hán: 國音新字) là một hệ thống chữ viết
                        biểu âm đề xuất cho tiếng Việt vào giữa thế kỷ 19. Hệ thống này sử dụng các nét
                        của chữ Hán và chữ Nôm để ghi âm tiếng Việt tương tự như Hiragana/Katakana hay
                        Bopomofo.
                    </p>

                    <p className="text-sm text-gray-700 leading-relaxed">
                        Hiện còn hai bản viết tay cổ về loại chữ này lưu tại Viện Nghiên cứu Hán Nôm, và
                        tác giả được ghi là một cư sĩ họ Nguyễn ở Nam Định với biệt hiệu “Ngũ Tinh Tụ Đẩu”(chữ Hán: 五星聚斗). 
                    </p>

                    <p className="text-sm text-gray-700 leading-relaxed">
                        Hệ thống gồm 22 “cán tự” (ghi phụ âm đầu) và 110 “chi tự” (ghi vần/nguyên âm), và
                        chia thanh theo truyền thống thành bốn loại với tám thanh. 
                    </p>

                    <p className="text-sm text-gray-600">
                        Mặc dù mang tính biểu âm sâu sắc, nhưng Quốc Âm Tân Tự không được phổ biến rộng
                        rãi do bối cảnh thời đại lúc bấy giờ. 
                    </p>
                </CardContent>
            </Card>
            <Card className="rounded-2xl shadow mt-6">
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-lg font-semibold">Đóng góp & nguồn cảm hứng</h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        Nội dung về Quốc Âm Tân Tự được tham khảo từ Wikipedia và các tài liệu nghiên
                        cứu ngôn ngữ. Xin cảm ơn các tác giả, nhà nghiên cứu và cộng đồng đã chia sẻ
                        hiểu biết về hệ thống chữ viết này.
                    </p>
                    <p className="text-sm text-gray-600">
                        <a
                            href="https://vi.wikipedia.org/wiki/Qu%E1%BB%91c_%C3%82m_T%C3%A2n_T%E1%BB%B1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Xem thêm trên Wikipedia
                        </a>
                    </p>
                </CardContent>
            </Card>

        </>
    );
}
