import { useRouter } from "vue-router";

export default function () {
    const router = useRouter();

    // 跳转到商品详情页面
    const toDetail = goodsId=> {
        // useRouter(); // undefined
        router.push(`/detail/${goodsId}`);
    }

    return {
        toDetail,
    }
}