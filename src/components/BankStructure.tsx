import { FC, useEffect, useState } from "react";
import axios from "axios";

interface BankDataResponse<T> {
    code: number;
    message: string;
    success: boolean;
    data: T;
}

interface Bank {
    bank_name: string;
    location: string;
    valuation: string;
    date?: string;
    child_banks?: Bank[];
}

type BankModalProps = Bank;

// type BankModalProps = Bank & {
//     isChecked: boolean;
// };

const BankModel: FC<BankModalProps> = ({
    bank_name,
    location,
    valuation,
    date,
    // isChecked,
}) => {
    return (
        <div className="bg-white w-[500px] rounded-xl">
            <div className="flex gap-2">
                {/* <input type="checkbox" checked={isChecked} /> */}
                <input type="checkbox" />
                <div>
                    <div>
                        <div className="font-bold">{bank_name}</div>
                        <div>({location})</div>
                    </div>
                    <div className="flex gap-4">
                        <span>{date}</span>
                        <span>{valuation}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BankModelRenderer: FC<BankModalProps> = ({
    bank_name,
    location,
    valuation,
    date,
    child_banks,
}) => {
    // const [checkedBanks, setCheckedBanks] = useState();
    return (
        <div className="flex flex-col gap-2">
            <BankModel
                bank_name={bank_name}
                location={location}
                valuation={valuation}
                date={date ? date : undefined}
                // isChecked={}
            />
            {child_banks?.map((bank: Bank, index) => (
                <div className="ml-7">
                    <BankModelRenderer
                        bank_name={bank.bank_name}
                        location={bank.location}
                        valuation={bank.valuation}
                        date={bank.date ? bank.date : undefined}
                        child_banks={bank?.child_banks}
                        key={index}
                    />
                </div>
            ))}
        </div>
    );
};

const BankStructure = () => {
    const [bankData, setBankData] = useState<Bank>();

    useEffect(() => {
        async function getData() {
            const response = await axios.get("http://localhost:3000/bank-data");
            const data: BankDataResponse<Bank> = response.data;
            setBankData(data.data);
        }
        getData();
    }, []);

    if (!bankData) {
        return <div>Loading...</div>;
    }

    return (
        <BankModelRenderer
            bank_name={bankData.bank_name}
            location={bankData.location}
            valuation={bankData.valuation}
            date={bankData.date ? bankData.date : undefined}
            child_banks={bankData?.child_banks}
        />
    );
};

export default BankStructure;
