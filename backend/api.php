<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    // تحديد مسار ملف JSON
    $file = 'registrations.json';
    
    // جلب البيانات السابقة إذا كان الملف موجوداً
    $current_data = [];
    if (file_exists($file)) {
        $current_data = json_decode(file_get_contents($file), true);
        if (!is_array($current_data)) {
            $current_data = [];
        }
    }
    
    // إضافة طابع زمني للتسجيل
    $data['created_at'] = date('Y-m-d H:i:s');
    
    // إضافة البيانات الجديدة
    $current_data[] = $data;
    
    // حفظ في الملف
    file_put_contents($file, json_encode($current_data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    
    echo json_encode(['success' => true, 'message' => 'تم التسجيل بنجاح']);
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'بيانات غير صالحة']);
}
?>
