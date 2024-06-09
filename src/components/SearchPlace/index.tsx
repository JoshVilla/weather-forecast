import React, { useEffect, useState } from "react";
import globalStyle from "../../global.module.scss";
import { Button, Form, Select } from "antd";
import regionData from "../../utils/data/region.json";
import provinceData from "../../utils/data/province.json";
import cityData from "../../utils/data/city.json";
// import barangayData from "../../utils/data/barangay.json";
import "./style.module.scss";
import FormItem from "antd/es/form/FormItem";

interface Props {
  onChange: Function;
}
const SearchForm = ({ onChange }: Props) => {
  const [form] = Form.useForm();
  const [region, setRegion] = useState<any>([]);
  const [province, setProvince] = useState<any>([]);
  const [city, setCity] = useState<any>([]);
  // const [barangay, setBarangay] = useState<any>([]);
  const [regionCode, setRegionCode] = useState<string>("");
  const [provinceCode, setProvinceCode] = useState<string>("");
  const [cityCode, setCityCode] = useState<string>("");

  const newRegionData = () => {
    const newList = regionData.map((region) => {
      return {
        id: region.id,
        psgc_code: region.psgc_code,
        label: region.region_name,
        value: region.region_code,
      };
    });

    setRegion(newList);
  };

  const newProvinceData = () => {
    const filterProvinceList = provinceData.filter((province) => {
      if (regionCode === province.region_code) {
        return province;
      }
    });

    const newList = filterProvinceList.map((province) => {
      return {
        psgc_code: province.psgc_code,
        label: province.province_name,
        value: province.province_code,
      };
    });

    setProvince(newList);
  };

  const newCityData = () => {
    const filterCityList = cityData.filter((city) => {
      if (provinceCode === city.province_code) {
        return city;
      }
    });

    const newList = filterCityList.map((city) => {
      return {
        psgc_code: city.psgc_code,
        label: city.city_name,
        value: city.city_code,
      };
    });

    setCity(newList);
  };

  // const newBarangayData = () => {
  //   const filterBarangayList = barangayData.filter((barangay: any) => {
  //     if (cityCode === barangay.city_code) {
  //       return barangay;
  //     }
  //   });

  //   const newList = filterBarangayList.map((barangay) => {
  //     return {
  //       psgc_code: barangay.psgc_code,
  //       label: barangay.brgy_name,
  //       value: barangay.brgy_code,
  //     };
  //   });

  //   setBarangay(newList);
  // };

  const filterOption = (
    input: string,
    option?: {
      id: number;
      psgc_code: string;
      label: string;
      value: string;
    }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onChangeRegion = (value: string) => {
    setRegionCode(value);
  };

  const onChangeProvince = (value: string) => {
    setProvinceCode(value);
  };

  const onChangeCity = (value: string) => {
    setCityCode(value);
  };

  // const onChangeBarangay = (value: string) => {
  //   setCityCode(value);
  // };

  const search = () => {
    const params = form.getFieldsValue();
    console.log(params);
  };

  useEffect(() => {
    newRegionData();
  }, []);

  useEffect(() => {
    newProvinceData();
  }, [regionCode]);

  useEffect(() => {
    newCityData();
  }, [provinceCode]);

  // useEffect(() => {
  //   newBarangayData();
  // }, [cityCode]);

  return (
    <div className={`${globalStyle.glassBackground} p-6 w-[400px]`}>
      <div className="text-xl mb-4">Search Place</div>
      <Form
        form={form}
        onFinish={search}
        initialValues={{
          region: "",
          province: "",
          city: "",
        }}
      >
        <FormItem name="region">
          <Select
            style={{ width: "100%" }}
            showSearch
            placeholder="Select a Region"
            optionFilterProp="children"
            onChange={onChangeRegion}
            // onSearch={onSearch}
            filterOption={filterOption}
            options={region}
          />
        </FormItem>
        <FormItem name="province">
          <Select
            style={{ width: "100%" }}
            showSearch
            placeholder={
              !regionCode ? "Select Region First" : "Select a Province"
            }
            optionFilterProp="children"
            onChange={onChangeProvince}
            // onSearch={onSearch}
            disabled={!regionCode}
            filterOption={filterOption}
            options={province}
          />
        </FormItem>
        <FormItem name="city">
          <Select
            style={{ width: "100%" }}
            showSearch
            placeholder={
              !provinceCode ? "Select Province First" : "Select a City"
            }
            optionFilterProp="children"
            onChange={onChangeCity}
            // onSearch={onSearch}
            disabled={!provinceCode}
            filterOption={filterOption}
            options={city}
          />
        </FormItem>
        {/* <FormItem>
          <Select
            style={{ width: "100%" }}
            showSearch
            placeholder={!cityCode ? "Select City First" : "Select a Barangay"}
            optionFilterProp="children"
            // onChange={onChangeCity}
            // onSearch={onSearch}
            disabled={!cityCode}
            filterOption={filterOption}
            options={barangay}
          />
        </FormItem> */}
        <Button htmlType="submit" type="primary">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default SearchForm;
