1-ilk olarak import

import BelgeNo from "@/components/PaylasilanComponentler/BelgeNo";

2-ikinci işlem  aşağıdaki satır fonksiyonun üstünde tanımlanmalı. burda id numarası paramtereler tablosundaki ilgili parametrenin idsidir.

const BELGENO_PARAMETRE_ID = 11;

3- returnun üstünde aşağıdaki satır olmalı 

async function updateParametreIfNeeded(belgeNo: string, parametreId: number) {
    try {
      const resp = await axios.get(`${apiUrl}/api/ayarlar/parametreler/${parametreId}`, accessToken ? {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      } : { withCredentials: true });
      const deger = resp.data?.deger?.toString?.() ?? "";
      if (belgeNo === deger) {
        if (/^\d+$/.test(deger)) {
          const yeniDeger = (parseInt(deger, 10) + 1).toString().padStart(deger.length, "0");
          await axios.post(`${apiUrl}/api/ayarlar/parametreler`, {
            parametreid: parametreId,
            deger: yeniDeger,
          }, accessToken ? {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          } : { withCredentials: true });
        }
      }
    } catch (err) {
      // Hata olursa sessiz geç
    }
  }

  4- form submite aşağıdaki gibi satır eklenmeli 

    function onSubmit(values: z.infer<typeof formSchema>) {
    updateParametreIfNeeded(values.BelgeNo, BELGENO_PARAMETRE_ID).finally(() => {
      createModulMutation.mutate({
        ...values,
      });
    });
  }


  5- formda ilgili yere aşağıdaki kod eklenmeli .

                 {/* Belge No */}
               <FormField
                      control={form.control}
                      name="BelgeNo"
                      render={({ field }) => (
                        <BelgeNo
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          required={true}
                          accessToken={accessToken ?? ''}
                          apiUrl={apiUrl}
                          parametreId={BELGENO_PARAMETRE_ID}
                        />
                      )}
                    />