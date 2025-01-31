import { PropsWithChildren } from 'react';

type ContractConnectProps = PropsWithChildren<{
    value: number;
    onGetValue: () => void;
}>;

export default function ContractConnect({ value, onGetValue }: ContractConnectProps) {
    return (
        <article>
            <div>
                <h2>{value}</h2>
            </div>
            <button onClick={() => onGetValue()}>Get Value</button>
        </article>
    );
}